import express from "express";

import { createSkill, updateSkill, deleteSkill } from "../controllers/skill.js";
import { uploadImage } from "../utils/imageUpload.js";
import isAuth from "../middlewares/is-Auth.js";
import validator from "../middlewares/validator.js";
import { skillSchema, patchSchema } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", isAuth, validator(skillSchema), uploadImage, createSkill);
router.patch("/:id", isAuth, uploadImage, validator(patchSchema), updateSkill);
router.delete("/:id", isAuth, deleteSkill);

export default router;
