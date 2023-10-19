import express from "express";
import { getUser, updateUser ,getUserDetails } from "../controllers/user.js";
import { uploadImage } from "../utils/imageUpload.js";
import isAuth from "../middlewares/is-Auth.js";
import validator from "../middlewares/validator.js";
import { projectValidation } from "../middlewares/validator.js";
const router = express.Router();

router.get("/details", getUserDetails);
router.get("/",isAuth, getUser);
router.patch("/", isAuth, uploadImage, validator(projectValidation), updateUser);

export default router;
