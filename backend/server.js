import express from "express";
import { config } from "dotenv";
import { connectDatabase } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import path from "path";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDatabase();
  console.log(`🟢 Server started on Port ${PORT}`);
});
