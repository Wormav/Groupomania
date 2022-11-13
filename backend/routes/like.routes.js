import { Router } from "express";
import {
  addLike,
  removeLike,
  getLike,
} from "../controllers/like.controller.js";

const router = Router();

router.post("/:id", addLike);
router.delete("/:id", removeLike);
router.get("/:id", getLike);

export default router;
