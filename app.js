import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import cookieParser from "cookie-parser";


import errorHandler from "./middlewares/errorHandler.js";

import { logInfo } from "./utils/logger.js";
import constant from "./config/constant.js";
import upload from "./utils/imageUpload.js";

import mailRouter from "./routes/mail.js";
import projectRouter from "./routes/project.js";
import skillRouter from "./routes/skill.js";
import userRouter from "./routes/user.js";
import githubRouter from "./routes/github.js";

const { NODE_ENV,CLIEND_URL } = constant;

const app = express();
app.use(cookieParser(
  "secret",
  {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    signed: true,
  },


));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing multipart/form-data
app.use(bodyParser.json({ }));
app.use(cors(
  {
    origin:CLIEND_URL,
    credentials:true,
  }
));
app.use(upload);


if (NODE_ENV === "development") {
  app.use(morgan("dev"));
  const accessLogStream = fs.createWriteStream("./log/access.log", {
    flags: "a",
  });
  app.use(morgan("combined", { stream: accessLogStream }));
  logInfo("Morgan enabled...");
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
