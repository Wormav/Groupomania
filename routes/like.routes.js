import { Router } from "express";
import {
  addLike,
  removeLike,
  getLike,
  getAllLike,
} from "../controllers/like.controller.js";

const router = Router();

router.post("/:id", addLike);
router.delete("/:id", removeLike);
router.get("/getlike/:id", getLike);
router.get("/getalllike", getAllLike);

export default router;
