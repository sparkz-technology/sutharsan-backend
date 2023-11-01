import User from "../models/user.js";
import constant from "../config/constant.js";



const isAuth = async (req, res, next) => {
  try {
    console.log(req.cookies,"token");
    const authHeader = req.headers.authorization;
    const tok = authHeader && authHeader.split(" ")[1];
    console.log(tok,"tok");
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
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
