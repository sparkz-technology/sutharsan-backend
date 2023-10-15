import Joi from "joi";
import { isSkillUnique } from "../utils/isFieldUnique.js";
import { isProjectUnique } from "../utils/isFieldUnique.js";

const messageSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(100).required(),
});

const projectSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(100).required(),
  github: Joi.string().uri().required(),
  website: Joi.string().uri().required(),
  technologies: Joi.string().min(3).max(30).required(),
});

const skillSchema = Joi.object({
  skill: Joi.string().min(3).max(30).required(),
  imageUrl: Joi.string().uri().required(),
  percentage: Joi.number().min(0).max(100).required(),
  category: Joi.string().min(3).max(30).required(),
});

const patchSchema = (key) =>
  ({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(100).required(),
    github: Joi.string().uri().required(),
    website: Joi.string().uri().required(),
    technologies: Joi.string().min(3).max(30).required(),
    skill: Joi.string().min(3).max(30).required(),
    imageUrl: Joi.string().uri().required(),
    percentage: Joi.number().min(0).max(100).required(),
    category: Joi.string().min(3).max(30).required(),
    homeInfo: Joi.string().min(30).required(),
    aboutInfo: Joi.string().min(30).required(),
    resumeLink: Joi.string().uri().required(),
    instagramLink: Joi.string().uri().required(),
    githubLink: Joi.string().uri().required(),
    linkedinLink: Joi.string().uri().required(),
    whatsAppLink: Joi.string().min(10).max(10).required(),
  }[key] || Joi.any());

const validator = (schema) => async (req, res, next) => {
  try {
    if (req.method === "PATCH") {
      Object.keys(req.body).forEach(async (key) => {
        if (key === "skill" || key === "title") {
          const isUnique = await (key === "skill"
            ? isSkillUnique
            : isProjectUnique)(req.body[key]);
          if (isUnique !== true) {
            const error = new Error(isUnique);
            error.statusCode = 400;
            throw error;
          }
        }
        const { error: validateError } = schema(key).validate(req.body[key]);
        if (validateError) {
          const { details } = validateError;
          const error = new Error(details[0].message);
          error.statusCode = 400;
          throw error;
        }
      });
    } else {
      const { error: validateError } = schema.validate(req.body);
      if (req.body.skill || req.body.title) {
        const isUnique = await (req.body.skill
          ? isSkillUnique
          : isProjectUnique)(req.body.skill || req.body.title);
        if (isUnique !== true) {
          console.log("isUnique", isUnique);
          const error = new Error(isUnique);
          error.statusCode = 400;
          throw error;
        }
      }
      if (validateError) {
        const { details } = validateError;
        const error = new Error(details[0].message);
        error.statusCode = 400;
        throw error;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validator;
export { messageSchema, projectSchema, skillSchema, patchSchema };
