import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  homeInfo: {
    type: String,
    required: true,
  },
  aboutInfo: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  contactLinks: {
    ref: "ContactLink",
    type: mongoose.Schema.Types.ObjectId,
  },
  skills: {
    ref: "Skill",
    type: mongoose.Schema.Types.ObjectId,
  },
  projects: {
    ref: "Project",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
