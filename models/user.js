import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    default: null,
  },
  
  views: {
    type: Number,
    default: 0,
  },
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
  instagramLink: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  linkedinLink: {
    type: String,
    required: true,
  },
  WhatsAppNumber: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },

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
