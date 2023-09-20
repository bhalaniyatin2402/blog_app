import { Router } from "express";
const blogRoutes = Router();
import { upload } from "../middleware/multerMiddleware.js";

import {
  allBlogs,
  readBlog,
  addblog,
  updateBlog,
  deleteBlog,
} from "../controller/blogController.js";

blogRoutes.get("/", allBlogs);
blogRoutes.get("/readblog/:id", readBlog);
blogRoutes.post("/addblog", upload.single("poster"), addblog);
blogRoutes.put("/updateblog/:id", upload.single("poster"), updateBlog);
blogRoutes.delete("/deleteblog/:id", deleteBlog);

export default blogRoutes;
