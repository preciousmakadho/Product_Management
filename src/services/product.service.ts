import { Product } from "../models/product.model";

export const  getAllProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw new Error('Error fetching Product');
        
    }
};
export const findProductById = async (id: number) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    } catch (error) {
        throw new Error('Error fetching product');
        
    }
};

export const createProduct = async (productData: any) => {
    try {
        const product = await Product.create(productData);
        return product;
    } catch (error) {
        throw new Error('Error creating product');
        
    }
};

export const updateProduct = async (id: number, productData: any) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        await product.update(productData);
        return product;
    } catch (error) {
        throw new Error('Error updating product');
        
    }
};

export const deleteProduct = async (id: number) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        await product.destroy();
    } catch (error) {
        throw new Error('Error deleting product');
        
    }
};