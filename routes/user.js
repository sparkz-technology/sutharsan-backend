import express from "express";
import { getUser, updateUser } from "../controllers/user.js";
import { uploadImage } from "../utils/imageUpload.js";
import isAuth from "../middlewares/is-Auth.js";
import validator from "../middlewares/validator.js";
import { patchSchema } from "../middlewares/validator.js";
const router = express.Router();

router.get("/", getUser);
router.patch("/", isAuth, uploadImage, validator(patchSchema), updateUser);

export default router;
