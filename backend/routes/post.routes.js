import { Router } from "express";
import {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getOnePost,
} from "../controllers/post.controllers.js";

import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllPost);
router.get("/:id", getOnePost);
router.post("/", upload.single("post_image"), createPost);
router.put("/:id", upload.single("post_image"), updatePost);
router.delete("/:id", deletePost);

export default router;
