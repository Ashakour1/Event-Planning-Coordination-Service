import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

/**
 * @controller register admin
 * @route /api/admin/
 * @method POST
 * @description register admin
 * @body {name: String, email: String , password: String} -  name , email and password
 * @access  public
 */

router.post("/", registerAdmin);
/**
 * @controller login admin
 * @route /api/admin/login
 * @method POST
 * @description login admin
 * @body { email: String , password: String} -  email and password
 * @access  public
 */
router.post("/login", loginAdmin);

export default router;
