import User from "../models/user.js";
import constant from "../config/constant.js";



const isAuth = async (req, res, next) => {
  try {
    console.log(req.cookies,"token");
    console.log(req.signedCookies,"signedCookies");
    const token = req.cookies.token;
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
