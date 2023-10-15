import express from "express";

import isAuth from "../middlewares/is-Auth.js";
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

router.post("/", isAuth, validator(contactLink), createContactLink);
router.patch("/:id", isAuth, validator(patchSchema), updateContactLink);
router.delete("/:id", isAuth, deleteContactLink);

export default router;
