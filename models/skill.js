import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
