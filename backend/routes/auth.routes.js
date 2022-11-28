import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";
import { getJwtId } from "../middlewares/getJwtId.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

router.get("/jwt", getJwtId);

export default router;
