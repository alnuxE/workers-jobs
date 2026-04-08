import { Router } from "express";
import { getFeedPosts, createPost, toggleLike, addComment } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";
import express from "express";

const router = Router();

router.get("/", getFeedPosts);
router.post("/", createPost);
router.put("/:id/like", authMiddleware as express.RequestHandler, toggleLike);
router.post("/:id/comment", authMiddleware as express.RequestHandler, addComment);

export default router;
