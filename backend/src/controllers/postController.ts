import { Request, Response } from "express";
import { PostModel } from "../models/Post";

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const filterType = req.query.filter as string || "all";
    
    let data;
    if (filterType === "all") {
      data = await PostModel.findAll();
    } else {
      const typeMap = filterType === "jobs" ? "job" : "worker";
      data = await PostModel.findByType(typeMap as "job"|"worker");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error obteniendo los posts en el controlador backend:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
