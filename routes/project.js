import express from "express";
const router = express.Router();

import isAuth from "../middlewares/is-Auth.js";

import {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} from "../controllers/project.js";
import { uploadImage } from "../utils/imageUpload.js";
import validator from "../middlewares/validator.js";
import { projectValidation, patchValidation } from "../middlewares/validator.js";
router.get("/", isAuth, getProjects);

router.post("/", isAuth,projectValidation,validator(projectValidation), uploadImage,  createProject);
router.patch(
  "/:id",
  isAuth,
  uploadImage,
  patchValidation,
  validator(patchValidation),
  updateProject
);
router.delete("/:id", isAuth, deleteProject);

export default router;
