import { Sequelize } from 'sequelize-typescript';
import dotenv from "dotenv";
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

dotenv.config();

export const sequelize = new Sequelize({
    database: 'rest_api',
    dialect: "mysql",
    host: 'localhost',
    port: parseInt("3306"),
    username: 'root',
    // password: 'Wily0734?',
    models: [Product,User],
    logging: console.log 
});

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};