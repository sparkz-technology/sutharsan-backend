import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
