import express from "express";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.js";
import { uploadImage } from "../utils/imageUpload.js";
import isAuth from "../middlewares/is-Auth.js";
import validator from "../middlewares/validator.js";
import { skillValidation, patchValidation } from "../middlewares/validator.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", isAuth,skillValidation, validator(skillValidation), uploadImage, createSkill);
router.patch("/:id", isAuth,patchValidation, validator(patchValidation), uploadImage, updateSkill);
router.delete("/:id", isAuth, deleteSkill);

export default router;
