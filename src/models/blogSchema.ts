import { Document, Schema, model } from "mongoose";

export interface IBlog {
  title: string,
  description: string,
  content: string,
  poster: string
}

export interface BlogDocument extends IBlog, Document {}

const blogSchema: Schema = new Schema({
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

const Blog = model<BlogDocument>("Blog", blogSchema);

export default Blog
