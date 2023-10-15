import express from "express";

import { createSkill, updateSkill, deleteSkill } from "../controllers/skill.js";
import { uploadImage } from "../utils/imageUpload.js";
import {
  validator,
  skillSchema,
  patchSchema,
} from "../middlewares/validator.js";

const router = express.Router();

router.post("/", uploadImage, validator(skillSchema), createSkill);
router.patch("/:id", uploadImage, validator(patchSchema), updateSkill);
router.delete("/:id", deleteSkill);

export default router;
