import express, { Express, Request, Response } from "express";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import { config } from "dotenv";

config()
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// specify base of different routes
app.use("/", blogRoutes);

// page not foud
app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("opps! 404 error. page not found");
});

// error handler middleware
app.use(errorMiddleware);

export default app;
