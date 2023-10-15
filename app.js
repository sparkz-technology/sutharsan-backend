import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

import errorHandler from "./middlewares/errorHandler.js";
import { logInfo } from "./utils/logger.js";
import constant from "./config/constant.js";
import mailRouter from "./routes/mail.js";
import projectRouter from "./routes/project.js";
import skillRouter from "./routes/skill.js";
import contactLinkRouter from "./routes/contactLink.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const { NODE_ENV } = constant;

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
app.use("/mail", mailRouter);
app.use("/project", projectRouter);
app.use("/skill", skillRouter);
app.use("/contact", contactLinkRouter);
app.use(errorHandler);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
