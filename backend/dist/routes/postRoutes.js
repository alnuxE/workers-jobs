"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
// GET /api/posts?filter=all
router.get("/", postController_1.getFeedPosts);
exports.default = router;
