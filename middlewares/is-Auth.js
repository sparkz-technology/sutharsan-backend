import User from "../models/user.js";
import constant from "../config/constant.js";



const isAuth = async (req, res, next) => {
  try {
     const AuthHeader = req.get("Authorization");
    if (!AuthHeader) {
      const error = new Error("Authorization header is required");
      error.statusCode = 400;
      throw error;
    }
    const token = AuthHeader.split(" ")[1];
    if (!token) {
      const error = new Error("Token is required");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ accessToken: token });
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
