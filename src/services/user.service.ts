import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';


export const register =async (userData: any) => {
    try {
        const {name,email,password, phone} = userData;

const existingUser = await User.findOne({ where: { email: userData.email } }); 

if (existingUser) {
    throw new Error('User already exists');
}

    const newUser = await User.create(userData);  
    return{
        id : newUser.id,
        name : newUser.name,
        email : newUser.email,
        phone : newUser.phone
    }
        
    } catch (error) {
        throw new Error('Failed to register user');
        
    }
     
}


export const login = async (email: string, password: string) => {
    try {
        console.log("Attempting login for email:", email);
        
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            console.log("User not found for email:", email);
            throw new Error('Invalid email or password');
        }
        
        console.log("User found, comparing passwords");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            console.log("Password comparison failed");
            throw new Error('Invalid email or password');
        }
        
        console.log("Password valid, generating token");
        
        if (!JWT_SECRET || JWT_SECRET === '') {
            throw new Error('JWT_SECRET is not configured');
        }
        
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_SECRET,
            {
                expiresIn: '30d'
            }
        );
        
        console.log("Login successful for user:", user.email);
        
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
        
    } catch (error: any) {
        console.error("Login service error:", error);
        throw error; // Re-throw the error to be handled by the controller
    }
};






export const getAllUsers = async () => {
    try {
        const users = await User.findAll();

        return users;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const findUserByID = async (id: number) => {
    try {
        const user = await User.findByPk(id);
        return user;
    }

    catch(error){
        throw new Error('Failed to fetch user');
    }
}


export const createUser = async (userData: any) => {
    try {
        const user = await User.create(userData);
        return user;
    }
    catch (error) {
        throw new Error('Failed to create user');
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        throw new Error('Failed to fetch user');
    }
}

export const updateUser = async (id: number, userData: any) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('User not found');
        }
        await user.update(userData);
        return user;
    }

    catch (error) {
        throw new Error('Failed to update user')
    }
}

export const deleteUser = async (id: number) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return true;
    }
    catch (error) {
        throw new Error('Failed to delete user');
    }
}