import User from "../models/user.js";

export const getUser = async (req, res, next) => {
  try {
    const userId = req.body.userId || "652b7193f2e37bd54e8de7df";
    const user = await User.findById(userId)
      .populate("contactLinks")
      .populate("skills")
      .populate("projects")
      .exec();

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
