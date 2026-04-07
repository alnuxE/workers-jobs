"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Opción de Mongoose ---
// Descomenta esto cuando tengas la URL de tu Base de Datos MongoDB:
/*
mongoose.connect('mongodb://localhost:27017/workers-jobs')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));
*/
// Rutas
app.use('/api/posts', postRoutes_1.default);
// Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend Express corriendo exitosamente en el puerto ${PORT}`);
});
