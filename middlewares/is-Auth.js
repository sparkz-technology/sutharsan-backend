import User from "../models/user.js";
import jwt from "jsonwebtoken";
import constant from "../config/constant.js";

const { JWT_SECRET } = constant;


const isAuth = async (req, res, next) => {
  try {
    //  const AuthHeader = req.get("Authorization");
    // if (!AuthHeader) {
    //   const error = new Error("Authorization header is required");
    //   error.statusCode = 400;
    //   throw error;
    // }
    // const token = AuthHeader.split(" ")[1];
    // if (!token) {
    //   const error = new Error("Token is required");
    //   error.statusCode = 400;
    //   throw error;
    // }
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, "secret");
    if (!decodedToken) {
      const error = new Error("Invalid token");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
