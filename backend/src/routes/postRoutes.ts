import { Router } from "express";
import { getFeedPosts, createPost } from "../controllers/postController";

const router = Router();

// GET /api/posts?filter=all
router.get("/", getFeedPosts);

// POST /api/posts
router.post("/", createPost);

export default router;
