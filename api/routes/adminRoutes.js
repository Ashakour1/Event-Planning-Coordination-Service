import express from "express";

import { registerAdmin, loginAdmin ,getAdminData} from "../controllers/adminController.js";
import adminProtect from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/", registerAdmin);
router.post("/login", loginAdmin);
router.get("/data",adminProtect ,getAdminData);

export default router;
