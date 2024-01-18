import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// Routers
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

// Public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Middlewares
import globalErrorHandlerMiddleware from "./middleware/globalErrorHandlerMiddleware.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD 👋");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res
    .status(404)
    .json({ msg: `Can't find ${req.originalUrl} on this server!` });
});

app.use(globalErrorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  // # Sometimes there are connection issues to DB due to connection string

  await mongoose.connect(process.env.DATABASE);
  app.listen(port, () => {
    console.log(`Database connected & server is running on PORT ${port}... 🔑`);
  });
} catch (err) {
  console.log(err);
  process.exist(1);
}
