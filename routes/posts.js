import express from "express";

import { getPost, createPost } from "../controllers/posts.js";

const router = express.Router();

router.route("/").get(getPost).post(createPost);

export default router;
