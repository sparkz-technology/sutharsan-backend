import Skill from "../models/skill.js";
import Project from "../models/project.js";

const isFieldUnique = (Model, field, errorMessage) => async (value,req) => {
  try {
    if (req.method === "PATCH") {
      console.log(req.params.id,req.method)
      const existingModel = await Model.findOne({ [field]: value });
      console.log(existingModel)
     if ( existingModel._id.toString() !== req.params.id) {
       return Promise.reject(errorMessage);
     }
     return Promise.resolve();
    }
    const existingModel = await Model.findOne({ [field]: value });
    if (existingModel) {
      return Promise.reject(errorMessage);
    }
    return Promise.resolve();
  } catch (error) {
    console.log(error);
  }
};

export const isSkillUnique = isFieldUnique(
  Skill,
  "skill",
  "Skill already exists"
);

export const isProjectUnique = isFieldUnique(
  Project,
  "title",
  "Project already exists"
);
