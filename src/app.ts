import express from "express";
import connectDB from "./utils/db";
import cors from "cors";
import productRoutes from "./routes/productRoutes";

const app = express();

connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: false,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.use("/api/products", productRoutes);

export default app;
