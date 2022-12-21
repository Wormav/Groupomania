import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/:id", createComment);
router.delete("/:id", deleteComment);
router.get("/:id", getAllComment);
router.put("/:id", updateComment);

export default router;
