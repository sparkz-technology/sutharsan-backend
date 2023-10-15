import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateAboutInfo = async (req, res) => {
  try {
    const user = await User.findOne();
    const { about } = req.body;
    user.about = about;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateHomeInfo = async (req, res) => {
  try {
    const user = await User.findOne();
    const { home } = req.body;
    user.home = home;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res) => {};
export const updateResume = async (req, res) => {};
