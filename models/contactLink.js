import mongoose from "mongoose";

const contactLinkSchema = new mongoose.Schema({
  socialMedia: {
    type: String,
    required: true,
  },
  socialMedialink: {
    type: String,
    required: true,
  },
});

const ContactLink = mongoose.model("ContactLink", contactLinkSchema);

export default ContactLink;
