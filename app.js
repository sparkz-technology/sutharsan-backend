import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
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
app.use(cors(
  {
    origin:true,
    credentials:true,
  }
));
app.use(cookieParser(
  "secret",
  {
    maxAge: 1000 * 60 * 60 * 24 * 30,//30 days
    httpOnly: true,//only http request can access cookie not client side js 
    signed: true,//signed cookie enable to access req.signedCookies 
    
  },
));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing multipart/form-data
app.use(bodyParser.json({ }));
app.use(upload);


if (NODE_ENV === "development") {
  app.use(morgan("dev"));
  const accessLogStream = fs.createWriteStream("./log/access.log", {
    flags: "a",
  });
  app.use(morgan("combined", { stream: accessLogStream }));
  logInfo("Morgan enabled...");
}
// if (NODE_ENV === "production") {
//   const __dirname = path.resolve();
// const distDir = __dirname + "/dist";
// app.use(express.static(distDir));
// app.get("*", (req, res) => {
//   res.sendFile(distDir)
// });
// }


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
