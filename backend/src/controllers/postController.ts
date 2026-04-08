import { Request, Response } from "express";
import { PostModel } from "../models/Post";

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const filterType = req.query.filter as string || "all";
    
    let query = {};
    if (filterType !== "all") {
      const typeMap = filterType === "jobs" ? "job" : "worker";
      query = { type: typeMap };
    }

    const data = await PostModel.find(query).sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error obteniendo los posts en el controlador backend:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    
    if (postData.author && !postData.author.time) {
      postData.author.time = "hace un momento";
    }

    const newPost = new PostModel(postData);
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creando post:", error);
    res.status(500).json({ error: "Error al crear la publicación", details: error });
  }
};
