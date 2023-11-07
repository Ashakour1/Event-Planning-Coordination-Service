import express from "express";

import { signupVendor, loginVendor } from "../controllers/vendorController.js";


const router = express.Router();

router.post("/", signupVendor).post("/login", loginVendor);

export default router;
