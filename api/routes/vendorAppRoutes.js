import express from "express"
import { getAllVendorApplications, getVendorApplicationById, setVendorApplication, updateVendorApplication } from "../controllers/vendorApplicationControllers.js"
import adminProtect from "../middleware/adminAuthMiddleware.js";
import vendorProtect from "../middleware/vendorAuthMiddleware.js";
const router = express.Router();

router.get("/",adminProtect,getAllVendorApplications).post("/",vendorProtect,setVendorApplication)
router.put("/:id",adminProtect,updateVendorApplication).get("/:id",vendorProtect,getVendorApplicationById)

export default router;