import Skill from "../models/skill.js";

export const createSkill = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload a file");
      error.status = 400;
      throw error;
    }
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
    Object.keys(req.body).forEach((key) => (skill[key] = req.body[key]));
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
    if (!req.params.id) {
      const error = new Error("Skill id is required");
      error.status = 400;
      throw error;
    }
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      const error = new Error("Skill not found");
      error.status = 404;
      throw error;
    }
    req.user.skills.pull(req.params.id);
    await req.user.save();
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    next(error);
  }
};
