import express from "express";
import { sendMessages } from "../controllers/mail.js";
import { messageSchema, validator } from "../middlewares/validator.js";

const router = express.Router();

router.post("/message", validator(messageSchema), sendMessages);

export default router;
