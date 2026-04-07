import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Opción de Mongoose ---
// Descomenta esto cuando tengas la URL de tu Base de Datos MongoDB:
/*
mongoose.connect('mongodb://localhost:27017/workers-jobs')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));
*/

// Rutas
app.use('/api/posts', postRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend Express corriendo exitosamente en el puerto ${PORT}`);
});
