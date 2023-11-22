import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

/**
 * @controller register user
 * @route /api/users/
 * @method POST
 * @description register user
 * @body {name : string , email : string , password : string}
 * @access  public
 */
router.post("/", registerUser);
/**
 * @controller login user
 * @route /api/users/login
 * @method POST
 * @description login user
 * @body {email : string , password : string}
 * @access  public
 */

router.post("/login", loginUser);

export default router;
