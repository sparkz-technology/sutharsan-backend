import express from "express";
import {
  createContactLink,
  updateContactLink,
  deleteContactLink,
} from "../controllers/contactLink.js";
import {
  validator,
  contactLink,
  patchSchema,
} from "../middlewares/validator.js";

const router = express.Router();

router.post("/", validator(contactLink), createContactLink);
router.patch("/:id", validator(patchSchema), updateContactLink);
router.delete("/:id", deleteContactLink);

export default router;
