const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/form", (req, res) => {
  const { fName: subject, message: message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.YOUR_EMAIL,
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
app.post("/api/ip", (req, res) => {
  const { ipAddress: message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.YOUR_EMAIL,
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
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
