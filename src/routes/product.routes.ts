import { Router } from "express";
import { createNewProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/product.controller";


const router = Router();
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createNewProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);
 
export default router
   