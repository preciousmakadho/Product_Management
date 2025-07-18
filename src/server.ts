import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/database';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, World!');
});
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
const startServer = async () => {
    try{
        await connectToDatabase();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }

    catch (error){
        console.error('Error starting the server:', error);
    }
}



startServer();