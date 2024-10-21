import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js'; 
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://mern-vercel-client-omega.vercel.app',
    credentials: true,
}));


app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', productRoutes); 

export default app;
