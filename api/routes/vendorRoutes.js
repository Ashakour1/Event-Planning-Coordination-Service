import express from "express";

import { signupVendor, loginVendor } from "../controllers/vendorController.js";


const router = express.Router();
/**
 * @controller signup vendor
 * @route /api/vendor/
 * @method POST
 * @description signup vendor
 * @body {name : string , email : string , password : string , phone : string , address : string , description : string , image : string}
 * @access  public
 */
router.post("/", signupVendor)
/**
 * @controller login vendor
 * @route /api/vendor/login
 * @method POST
 * @description login vendor
 * @body {email : string , password : string}
 * @access  public
 */
router.post("/login", loginVendor);

export default router;
