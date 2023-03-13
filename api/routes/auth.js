import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import { register, login, logout, userdata } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/userdata/:id", userdata);

export default router;
