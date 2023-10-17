import Skill from "../models/skill.js";
import { deleteImage } from "../utils/imageUpload.js";

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    req.user.skills.push(skill);
    await req.user.save();
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};
export const updateSkill = async (req, res, next) => {
  try {
    if (!req.params.id) {
      const error = new Error("Skill id is required");
      error.status = 400;
      throw error;
    }
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      const error = new Error("Skill not found");
      error.status = 404;
      throw error;
    }
    if (req.body.imageUrl) {
      try {
        deleteImage(skill.imageUrl);
      } catch (imageDeletionError) {
        const error = new Error("Image deletion failed");
        error.status = 500;
        throw error;
      }
    }
    console.log(req.body);
    Object.keys(req.body).forEach((key) => (skill[key] = req.body[key]));
    console.log(skill);
    await skill.save();
    req.user.skills.pull(req.params.id);
    req.user.skills.push(skill);
    await req.user.save();
    res.status(200).json(skill);
  } catch (error) {
    next(error);
  }
};
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      const error = new Error("Skill not found");
      error.status = 404;
      throw error;
    }
    try {
      deleteImage(skill.imageUrl);
    } catch (imageDeletionError) {
      const error = new Error("Image deletion failed");
      error.status = 500;
      throw error;
    }

    const user = req.user;
    user.skills.pull(req.params.id);

    try {
      await user.save();
    } catch (userUpdateError) {
      throw userUpdateError;
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    next(error);
  }
};
