import sendMail from "../services/mail.js";
import constant from "../config/constant.js";
import { logEmail } from "../utils/logger.js";

export const sendMessages = async (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    const subject = `Message from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const info = await sendMail({ subject, text });
    if (constant.NODE_ENV === "development") {
      logEmail(`Email sent: ${info.response}`);
    }
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};
