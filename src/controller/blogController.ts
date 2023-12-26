import fs from "fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";

import Blog, { IBlog, BlogDocument } from "../models/blogSchema";
import AppError from "../utils/errorUtil";

// to a blog
const addblog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
      return next(new AppError("all fields is required filed", 400));
    }

    const blogExist: IBlog | null = await Blog.findOne({ title });
    if (blogExist) {
      return next(new AppError("blog alreasy exist on this title", 400));
    }

    const blog: BlogDocument = new Blog<IBlog>({
      title,
      description,
      content,
      poster:
        "https://www.monsterinsights.com/wp-content/uploads/2020/01/what-is-the-best-time-to-post-a-blog-and-how-to-test-it.jpg",
    });

    if (!blog) {
      return next(
        new AppError("blog is not uploded! something went wrong", 400)
      );
    }

    // TODO: file upload
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "blog",
          width: 250,
          height: 250,
          gravity: "center",
          crop: "fill",
        });

        if (result) {
          blog.poster = result.secure_url;
        }

        // deleting file from server
        fs.rmSync(`uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError(`file uploading error: ${error}`, 400));
      }
    }

    await blog.save();

    res.status(200).send({
      success: true,
      blog,
    });
  } catch (error) {
    return next(new AppError(`blog add error: ${error}`, 400));
  }
};

// read a specific blog
const readBlog = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.id;

  const blog: IBlog | null = await Blog.findOne({ _id: blogId });

  if (!blog) {
    return next(new AppError("blog is not availble. try after some time", 400));
  }

  res.status(200).send({
    success: true,
    blog,
  });
};

// show list of all blogs
const allBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs: Array<IBlog> = await Blog.find();

    if (!blogs) {
      return next(new AppError("blogs are not availbale right now", 400));
    }

    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(new AppError(`error to get all blogs: ${error}`, 400));
  }
};

// update existing blog
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;

    const blog: BlogDocument | null = await Blog.findByIdAndUpdate(req.params.id, { ...req.body });

    if (!blog) {
      return next(new AppError("blog  does not exist on this id", 400));
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "blog",
          width: 250,
          height: 250,
          gravity: "center",
          crop: "fill",
        });

        if (result) {
          blog.poster = result.secure_url;
        }

        fs.rmSync(`uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError("uploading error: " + error, 400));
      }
    }
    await blog.save();

    res.status(200).json({
      success: true,
      message: "update done",
      blog,
    });
  } catch (error) {
    return next(new AppError("blog updating error: " + error, 400));
  }
};

// delete blog
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;

    const blog: IBlog | null = await Blog.findOne({ _id: blogId });

    if (!blog) {
      return next(new AppError("blog is not exist", 400));
    }

    const result = await Blog.deleteOne({ _id: blogId });

    res.status(200).json({
      success: true,
      message: `blog delete successfully`,
      result,
    });
  } catch (error) {
    return next(new AppError("blog delete error: " + error, 400));
  }
};

export { allBlogs, readBlog, addblog, updateBlog, deleteBlog };
