import fs from "fs";
import path from "path";
import constant from "../config/constant.js";
const { NODE_ENV } = constant;

const __dirname = path.resolve();

const logInfo = (message) => {
  log("info", message);
};

const logError = (message) => {
  log("error", message);
};

const logEmail = (message) => {
  log("email", message);
};

const log = (level, message) => {
  const logDirectory = path.join(__dirname, "log");
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level}]: ${message}\n`;
  const logFileName = `${level}.log`;

  fs.appendFile(path.join(logDirectory, logFileName), logMessage, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const deleteAndRecreateLogs = () => {
  const logDirectory = path.join(__dirname, "log");
  if (fs.existsSync(logDirectory)) {
    fs.readdirSync(logDirectory).forEach((file) => {
      fs.unlinkSync(path.join(logDirectory, file));
    });
  } else {
    fs.mkdirSync(logDirectory);
  }
};

if (NODE_ENV === "development"){
  deleteAndRecreateLogs();
}

export { logInfo, logError, logEmail };
