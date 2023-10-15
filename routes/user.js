import express from "express";
import { getUser, updateUser } from "../controllers/user.js";
import { uploadImage } from "../utils/imageUpload.js";
import isAuth from "../middlewares/is-Auth.js";

const router = express.Router();

router.get("/", getUser);
router.patch("/", isAuth, uploadImage, updateUser);

export default router;
