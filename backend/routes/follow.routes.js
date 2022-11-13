import { Router } from "express";
import { addFollow, removeFollow } from "../controllers/follow.controller.js";

const router = Router();

router.post("/:id", addFollow);
router.delete("/:id", removeFollow);

export default router;
