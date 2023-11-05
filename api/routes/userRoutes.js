import express from "express";
import protect from "../middleware/authMiddleware.js";
import { registerUser,loginUser ,getUserData } from "../controllers/userController.js";

const router = express.Router();

router.post("/",registerUser)
router.post("/login",loginUser)
router.get("/me",protect,getUserData)


export default router;