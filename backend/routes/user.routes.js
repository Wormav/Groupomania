import { Router } from "express";
import {
  getAllUsers,
  getOneUser,
  updateUser,
  disableUser,
  reactiveUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", disableUser);
router.put("/reactive/:id", reactiveUser);

export default router;
