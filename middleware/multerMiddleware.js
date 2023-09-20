import multer from "multer";
import path from "path";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 3 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();

    if (
      ext !== ".jpg" &&
      ext !== ".jpge" &&
      ext !== ".png" &&
      ext !== "webp" &&
      ext !== ".mp4"
    ) {
      return cb(new Error(`unsupported file type: ${ext}`), false);
    }

    cb(null, true);
  },
});

export { upload };
