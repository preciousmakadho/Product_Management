import { Request, Response } from "express";
import { login, register } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }
        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is required" });
        }
        const user = await register(req.body);
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully",
            data: user }); 
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" }); 
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }
        
        const result = await login(email, password);
        res.status(200).json({ 
            success: true, 
            message: "User logged in successfully", 
            data: result 
        });
        
    } catch (error: any) {
        console.error("Login error:", error);
        
        // Handle specific error messages
        if (error.message === 'Invalid email or password') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid email or password" 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};
export const getProfile = async (req: Request, res: Response) => {
    try{
        const user = req.user;
        
         

     
        res.status(200).json({ success: true, message: "User profile fetched successfully", data: user });        
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    }
