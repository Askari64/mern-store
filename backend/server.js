import express from "express";
import { config } from "dotenv";
import { connectDatabase } from "./config/db.js";
import productRouter from "./routes/product.route.js";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`🟢 Server started on Port ${PORT}`);
});
