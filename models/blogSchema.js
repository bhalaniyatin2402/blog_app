import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is require"],
    unique: [true, "title already exist"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  content: {
    type: String,
    required: [true, "description is required"],
  },
  poster: {
    type: String,
    required: [true, "description is required"],
  },
});

export default model("Blog", blogSchema);
