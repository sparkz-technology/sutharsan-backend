import Skill from "../models/skill.js";
import Project from "../models/project.js";

const isFieldUnique = (model, field, errorMessage) => async (value) => {
  try {
    const modelData = await model.findOne({ [field]: value });
    if (modelData) {
      return errorMessage;
    }
    return true;
  } catch (err) {
    console.error(err);
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
