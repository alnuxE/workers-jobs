import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workers-jobs';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', authMiddleware as express.RequestHandler, postRoutes);
app.use('/api/products', productRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend Express corriendo exitosamente en el puerto ${PORT}`);
});
