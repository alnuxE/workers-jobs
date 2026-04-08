import { Router } from "express";
import multer from "multer";
import path from "path";
import { getProducts, createProduct } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import express from "express";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get("/", getProducts);
router.post("/", authMiddleware as express.RequestHandler, upload.single("image"), createProduct);

export default router;
