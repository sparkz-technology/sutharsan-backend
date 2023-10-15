import fs from "fs";
import path from "path";

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
  if (!fs.existsSync(path.join(__dirname, "log"))) {
    fs.mkdirSync(path.join(__dirname, "log"));
  }
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level}]: ${message}\n`;
  const logFileName = `${level}.log`;
  const Logger = fs.createWriteStream(
    path.join(__dirname, "log", logFileName),
    {
      flags: "a",
    }
  );
  Logger.write(logMessage);
};

export { logInfo, logError, logEmail };
