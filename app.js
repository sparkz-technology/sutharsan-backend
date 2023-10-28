import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import passport from "passport";
import session from "express-session";


import errorHandler from "./middlewares/errorHandler.js";

import { logInfo } from "./utils/logger.js";
import constant from "./config/constant.js";
import upload from "./utils/imageUpload.js";
import  "./config/passport.js";

import mailRouter from "./routes/mail.js";
import projectRouter from "./routes/project.js";
import skillRouter from "./routes/skill.js";
import userRouter from "./routes/user.js";
import githubRouter from "./routes/github.js";

const app = express();
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // for parsing multipart/form-data
app.use(bodyParser.json({ limit: "50mb" })); // for parsing application/json // for parsing application/x-www-form-urlencoded
app.use(cors(
  {
    origin: "*", // allow to server to accept request from different origin
    credentials: true,
  },
));
app.use(upload);

const { NODE_ENV } = constant;

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
  const accessLogStream = fs.createWriteStream("./log/access.log", {
    flags: "a",
  });
  app.use(morgan("combined", { stream: accessLogStream }));
  logInfo("Morgan enabled...");
}
if (NODE_ENV === "development") {
  const __dirname = path.resolve();
  const reactPath = path.join(__dirname, "../sutharsan/dist");
  app.use(express.static(path.join(__dirname, "../sutharsan/dist")));
  app.get("*", (req, res) => {
    res.sendFile(reactPath);
  });
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});
app.use("/user", userRouter);
app.use("/mail", mailRouter);
app.use("/project", projectRouter);
app.use("/skill", skillRouter);
app.use("/auth", githubRouter);

app.use(errorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
