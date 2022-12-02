import { Router } from "express";
import {
  addFollow,
  removeFollow,
  getFollower,
  getFollowing,
} from "../controllers/follow.controller.js";

const router = Router();

router.post("/:id", addFollow);
router.delete("/:id", removeFollow);
router.get("/follower", getFollower);
router.get("/following", getFollowing);

export default router;
