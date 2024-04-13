import User from "../models/user.js";
import constant from "../config/constant.js";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = constant;


const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    console.log(token);
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
     
    
    const user = await User.findById(decoded.id);
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
