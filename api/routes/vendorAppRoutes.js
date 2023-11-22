import express from "express"
import { getAllVendorApplications, getVendorApplicationById, setVendorApplication, updateVendorApplication } from "../controllers/vendorApplicationControllers.js"
import adminProtect from "../middleware/adminAuthMiddleware.js";
import vendorProtect from "../middleware/vendorAuthMiddleware.js";
const router = express.Router();
/**
 * @controller get all vendor applications
 * @route /api/vendorApplications/
 * @method GET
 * @description get all vendor applications
 * @access  private/admin
 */
router.get("/",adminProtect,getAllVendorApplications)
/**
 * @controller set vendor application
 * @route /api/vendorApplications/
 * @method POST
 * @description set vendor application
 * @body {name : string , description : string , date : string , time : string , location : string , vendorId : string}
 * @access  private/admin/vendor
 */
router.post("/",adminProtect,vendorProtect,setVendorApplication)
/**
 * @controller update vendor application
 * @route /api/vendorApplications/:id
 * @method PUT
 * @description update vendor application
 * @body {name : string , description : string , date : string , time : string , location : string , vendorId : string}
 * @access  private/admin
 * @param {string} id - vendor application id
 */
router.put("/:id",adminProtect,updateVendorApplication)
/**
 * @controller get vendor application by id
 * @route /api/vendorApplications/:id
 * @method GET
 * @description get vendor application by id
 * @access  private/admin
 * @param {string} id - vendor application id
 */
router.get("/:id",vendorProtect,getVendorApplicationById)

export default router;