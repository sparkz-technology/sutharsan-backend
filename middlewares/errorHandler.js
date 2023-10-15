import constant from "../config/constant.js";
import { logError } from "../utils/logger.js";

const { NODE_ENV } = constant;

const errorHandler = (err, req, res, next) => {
  if (NODE_ENV === "development") {
    logError(err.stack);
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
