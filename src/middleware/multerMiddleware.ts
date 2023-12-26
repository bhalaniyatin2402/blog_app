import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

export const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 3 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req: Request, file: Express.Multer.File, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req: Request, file: Express.Multer.File, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();

    if (
      ext !== ".jpg" &&
      ext !== ".jpge" &&
      ext !== ".png" &&
      ext !== "webp" &&
      ext !== ".mp4"
    ) {
      return cb(null, false);
    }

    cb(null, true);
  },
});
