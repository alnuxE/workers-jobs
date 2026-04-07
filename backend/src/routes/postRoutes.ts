import { Router } from "express";
import { getFeedPosts } from "../controllers/postController";

const router = Router();

// GET /api/posts?filter=all
router.get("/", getFeedPosts);

export default router;
