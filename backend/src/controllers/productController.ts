import { Request, Response } from "express";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await ProductModel.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Usuario no autorizado" });
      return;
    }

    const { title, description, price, condition, location, tags } = req.body;
    
    // Check if an image was uploaded
    let imagePath = "https://via.placeholder.com/600x400?text=Sin+Imagen";
    if (req.file) {
      imagePath = `http://localhost:4000/uploads/${req.file.filename}`;
    }

    const userModel = await UserModel.findById(userId);
    if (!userModel) {
      res.status(404).json({ error: "Vendedor no encontrado" });
      return;
    }

    const tagsArray = tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [];

    const newProduct = new ProductModel({
      seller: {
        id: userModel._id,
        name: userModel.name,
        avatar: userModel.avatar
      },
      title,
      description,
      price,
      condition,
      location,
      imagePath,
      tags: tagsArray
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error en el servidor al intentar publicar producto" });
  }
};
