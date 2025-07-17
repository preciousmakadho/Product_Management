import { parse } from "path";
import { createProduct, deleteProduct, findProductById, getAllProducts, updateProduct } from "../services/product.service";
import { Request, Response } from "express";
export const getProducts =  async(req:Request, res:Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(
            { 
                success: true,
                message: "Products fetched successfully",
                data: products,}
        );
        
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal  Server Error", });
        
    }

}
export const getProductById =  async(req:Request, res:Response) => {
   try {
    const productId =parseInt(req.params.id);
  if (isNaN(productId)) {
    return res.status(400).json({ 
        success: false, 
        message: "Invalid product ID" });
  }
    const product = await findProductById(productId);
   if (!product) {
    return res.status(404).json({ 
        success: false, 
        message: "Product not found" });
   }
    res.status(200).json(
        { 
            success: true,
            message: "Product fetched successfully",
            data: product,}
    );
    
   } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json(
        { success: false, 
            message: "Internal  Server Error",
         });
    
        }
   }
export const createNewProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const newProduct = await createProduct (productData);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                success: false,
                message: "A product with the provided name or SKU already exists.",
            });
        }
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const updateProductById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const productData = req.body;
        const updatedProduct = await updateProduct(id, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await deleteProduct(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


   