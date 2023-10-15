import nodemailer from "nodemailer";
import constant from "../config/constant.js";
const { EMAIL, PASSWORD, YOUR_EMAIL } = constant;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const sendMail = (value) => {
  const { subject, text } = value;
  const mailOptions = {
    from: EMAIL,
    to: YOUR_EMAIL,
    subject,
    text,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export default sendMail;
