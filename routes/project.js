import express from "express";
const router = express.Router();

import isAuth from "../middlewares/is-Auth.js";

import {
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.js";
import { uploadImage } from "../utils/imageUpload.js";
import validator from "../middlewares/validator.js";
import { projectSchema, patchSchema } from "../middlewares/validator.js";

router.post("/", isAuth, uploadImage, validator(projectSchema), createProject);
router.patch(
  "/:id",
  isAuth,
  uploadImage,
  validator(patchSchema),
  updateProject
);
router.delete("/:id", isAuth, deleteProject);

export default router;
