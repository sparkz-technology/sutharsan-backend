const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
router.post("/form", (req, res) => {
  const { fName: subject, message: message } = req.body;
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.YOUR_EMAIL,
    subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Something went wrong." });
    } else {
      console.log("Email sent successfully", info.response);
      res.status(200).send({ success: "Email sent successfully" });
    }
  });
});
router.post("/ip", (req, res) => {
  const { ipAddress: message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.YOUR_EMAIL,
    subject: "IP Address ",
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Something went wrong." });
    } else {
      console.log("Email sent successfully", info.response);
      res.status(200).send({ success: "Email sent successfully" });
    }
  });
});
module.exports = router;
