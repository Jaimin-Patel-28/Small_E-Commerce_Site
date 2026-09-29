import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// app.use((err, req, res, next) => {
//   if (err.code === 11000)
//     return res.status(409).json({ message: "Email already registered" });
//   console.error(err);
//   res.status(500).json({ message: "Something went wrong" });
// });

export default app;
