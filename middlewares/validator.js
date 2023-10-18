import { validationResult } from 'express-validator';
import { isSkillUnique } from '../utils/isFieldUnique.js';
import { isProjectUnique } from '../utils/isFieldUnique.js';
import { check, body, param } from 'express-validator';
import e from 'express';

const messageValidation = [
  body('name').isString().isLength({ min: 3, max: 30 }).notEmpty(),
  body('email').isEmail().notEmpty(),
  body('message').isString().isLength({ min: 10, max: 100 }).notEmpty(),
];

const projectValidation = [
  body('title').isString().isLength({ min: 3, max: 30 }).notEmpty().custom((value, { req }) => {
    return isProjectUnique(value,req);
  }),
  body('description').isString().isLength({ min: 10, max: 100 }).notEmpty(),
  body('github').isURL().notEmpty(),
  body('website').isURL().notEmpty(),
  body('technologies').isString().isLength({ min: 3, max: 100 }).notEmpty(),
];

const skillValidation = [
  body('skill').isString().isLength({ min: 3, max: 30 }).notEmpty().custom((value, { req }) => {
    return isSkillUnique(value,req);
  }),
  body('percentage').isFloat({ min: 0, max: 100 }).notEmpty(),
  body('category').isString().isLength({ min: 3, max: 30 }).notEmpty(),
];

const patchValidation =[

  body('title').isString().isLength({ min: 3, max: 30 }).optional().custom((value, { req }) => {
    return isProjectUnique(value,req);
  }),
  body('description').isString().isLength({ min: 10, max: 100 }).optional(),
  body('github').isURL().optional(),
  body('website').isURL().optional(),
  body('technologies').isString().isLength({ min: 3, max: 100 }).optional(),
  body('skill').isString().isLength({ min: 3, max: 30 }).optional().custom((value, { req }) => {
    return isSkillUnique(value,req);
  }),
  body('percentage').isFloat({ min: 0, max: 100 }).optional(),
  body('category').isString().isLength({ min: 3, max: 30 }).optional(),


]
    

const validator = (schema) => {
  return async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
// export { messageSchema, projectSchema, skillSchema, patchSchema };
export { messageValidation, projectValidation, skillValidation, patchValidation};
export default validator;
