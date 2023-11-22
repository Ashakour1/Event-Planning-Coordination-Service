import express from "express";
import {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import adminProtect from "../middleware/adminAuthMiddleware.js";
import userProtect from "../middleware/userAuthMiddleware.js";
import vendorProtect from "../middleware/vendorAuthMiddleware.js";

const router = express.Router();

/**
 * @controller get all events
 * @route /api/events/
 * @method GET
 * @description get all events
 * @access  private/admin/user/vendor
 */
router.get("/", adminProtect, vendorProtect, userProtect, getEvents);
/**
 * @controller set event
 * @route /api/events/
 * @method POST
 * @description set event
 * @body {name : string , description : string , date : string , time : string , location : string , vendorId : string}
 * @access  private/admin
 */
router.post("/", adminProtect, setEvent);

/**
 * @controller update event
 * @route /api/events/:id
 * @method PUT
 * @description update event
 * @body {name : string , description : string , date : string , time : string , location : string , vendorId : string}
 * @access  private/admin
 * @param {string} id - event id
 */
router.put("/:id", adminProtect, updateEvent);
/**
 * @controller delete event
 * @route /api/events/:id
 * @method DELETE
 * @description delete event
 * @access  private/admin
 * @param {string} id - event id
 */

router.delete("/:id", adminProtect, deleteEvent);

export default router;
