import { Router } from "express";
import {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getOnePost,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/", getAllPost);
router.get("/:id", getOnePost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
