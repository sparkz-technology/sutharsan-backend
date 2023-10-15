import Joi from "joi";

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

const contactLink = Joi.object({
  socialMedia: Joi.string().min(3).max(30).required(),
  socialMedialink: Joi.string().uri().required(),
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
    socialMedia: Joi.string().min(3).max(30).required(),
    socialMedialink: Joi.string().uri().required(),
    homeInfo: Joi.string().min(30).required(),
    aboutInfo: Joi.string().min(30).required(),
    resumeLink: Joi.string().uri().required(),
  }[key] || {});

const validator = (schema) => (req, res, next) => {
  if (req.method === "PATCH") {
    Object.keys(req.body).forEach((key) => {
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
    if (validateError) {
      const { details } = validateError;
      const error = new Error(details[0].message);
      error.statusCode = 400;
      throw error;
    }
  }
  next();
};

export {
  messageSchema,
  projectSchema,
  skillSchema,
  contactLink,
  patchSchema,
  validator,
};
