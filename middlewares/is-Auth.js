import User from "../models/user.js";

const isAuth = async (req, res, next) => {
  const userId = req.body.userId || "652b7193f2e37bd54e8de7df";
  try {
    if (!userId) {
      const error = new Error("User id is required");
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findById(userId);
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
