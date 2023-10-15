import express from "express";
const router = express.Router();

import {
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.js";
import { uploadImage } from "../utils/imageUpload.js";
import {
  validator,
  projectSchema,
  patchSchema,
} from "../middlewares/validator.js";

router.post("/", uploadImage, validator(projectSchema), createProject);
router.patch("/:id", uploadImage, validator(patchSchema), updateProject);
router.delete("/:id", deleteProject);

export default router;
