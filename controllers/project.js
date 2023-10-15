import Joi from "joi";
import Project from "../models/project.js";

export const createProject = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload a file");
      error.status = 400;
      throw error;
    }
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
export const updateProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      const error = new Error("Project id is required");
      error.status = 400;
      throw error;
    }
    const project = await Project.findById(id);
    if (!project) {
      const error = new Error("Project not found");
      error.status = 404;
      throw error;
    }
    Object.keys(req.body).forEach((key) => (project[key] = req.body[key]));
    console.log(Object.keys(req.body));
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
export const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      const error = new Error("Project id is required");
      error.status = 400;
      throw error;
    }
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      const error = new Error("Project not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};
