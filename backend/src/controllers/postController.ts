import { Request, Response } from "express";
import { PostModel } from "../models/Post";
import { UserModel } from "../models/User";
import { AuthRequest } from "../middlewares/authMiddleware";

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

export const toggleLike = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post no encontrado" });
      return;
    }

    const userIndex = post.likedBy.indexOf(userId as any);
    if (userIndex === -1) {
      post.likedBy.push(userId as any);
    } else {
      post.likedBy.splice(userIndex, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error al dar like:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id;
    const { text } = req.body;

    if (!userId) {
      res.status(401).json({ error: "No autorizado" });
      return;
    }

    if (!text || text.trim() === "") {
      res.status(400).json({ error: "El comentario no puede estar vacío" });
      return;
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post no encontrado" });
      return;
    }

    const userModel = await UserModel.findById(userId);
    if (!userModel) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const newComment = {
      user: userId as any,
      authorName: userModel.name,
      authorAvatar: userModel.avatar,
      text: text.trim(),
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
