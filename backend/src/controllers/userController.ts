import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { AuthRequest } from "../middlewares/authMiddleware";
import path from "path";
import fs from "fs";

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    const { name, bio, location, phone, skills } = req.body;
    const userToUpdate = await UserModel.findById(userId);

    if (!userToUpdate) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    // Actualizar campos de texto
    if (name) userToUpdate.name = name;
    if (bio !== undefined) userToUpdate.bio = bio;
    if (location !== undefined) userToUpdate.location = location;
    if (phone !== undefined) userToUpdate.phone = phone;
    if (skills !== undefined) {
      userToUpdate.skills = Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim());
    }

    // Si hay archivo, guardar ruta
    if (req.file) {
      userToUpdate.avatar = `http://localhost:4000/uploads/${req.file.filename}`;
    }

    await userToUpdate.save();

    res.status(200).json({
      id: userToUpdate._id,
      name: userToUpdate.name,
      email: userToUpdate.email,
      avatar: userToUpdate.avatar,
      role: userToUpdate.role,
      bio: userToUpdate.bio,
      location: userToUpdate.location,
      phone: userToUpdate.phone,
      skills: userToUpdate.skills
    });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
