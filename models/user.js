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
  contactLinks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContactLink",
    },
  ],
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
