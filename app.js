import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());

// specify base of different routes
app.use("/", blogRoutes);

// page not foud
app.use("*", (req, res, next) => {
  res.status(404).send("opps! 404 error. page not found");
});

// error handler middleware
app.use(errorMiddleware);

export default app;
