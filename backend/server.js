import express from "express";
import { config } from "dotenv";
import { connectDatabase } from "./config/db.js";
import Product from "./models/product.model.js";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(`Error creating a product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`id: ${id}`);
  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: `Product ${id} has been successfully deleted`,
    });
  } catch (error) {
    console.log(`Error; ${error.message}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  const product = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.listen(PORT, () => {
  connectDatabase();
  console.log(`🟢 Server started on Port ${PORT}`);
});
