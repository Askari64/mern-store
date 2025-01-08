import { Router } from "express";
import { createNewProduct, deleteProduct, getAllProducts, updateProduct} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createNewProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
