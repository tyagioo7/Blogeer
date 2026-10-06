import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPost,updatePost,deletePost, getPostById } from "../controllers/postController.js";



const router = express.Router()
router.post("/", authMiddleware, createPost);
router.get("/:id",authMiddleware,getPostById)

router.patch("/:id",authMiddleware,updatePost)

router.delete("/:id",authMiddleware,deletePost)
export default router;


