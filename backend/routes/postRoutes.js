import express from "express";
import db from "../config/db.js";

const router = express.Router();


import { getPostById,getPosts,createPost,updatePost,deletePost } from "../controllers/postController.js"; 

router.get("/",getPosts);
router.get("/:id", getPostById);
router.post("/",createPost);
router.put("/:id",updatePost)
router.delete("/:id",deletePost)

export default router;
