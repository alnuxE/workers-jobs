import { Router } from "express";
import multer from "multer";
import path from "path";
import { updateProfile } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import express from "express";

const router = Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Para evitar conflictos renombramos usando timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Protegemos la ruta con authMiddleware y usamos upload.single('avatar')
router.put("/profile", authMiddleware as express.RequestHandler, upload.single("avatar"), updateProfile);

export default router;
