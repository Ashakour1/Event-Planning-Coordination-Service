import express from "express";
import {
  getAllInvitations,
  getInvitationByEventId,
  setInvitation,
  updateInvitation,
} from "../controllers/invitationController.js";
import adminProtect from "../middleware/adminAuthMiddleware.js";
import userProtect from "../middleware/userAuthMiddleware.js";

const router = express.Router();

/**
 * @controller get all invitions
 * @route /api/invitions/
 * @method GET
 * @description get all invition
 * @access  private/admin/user
 
 */
router.get("/", adminProtect, getAllInvitations);

/**
 * @controller Set  invitation
 * @route /api/invitation/
 * @method POST
 * @description Set  invition
 * @body {eventId : string , userId : string}
 * @access  private/admin/user
 */
router.post("/", userProtect, adminProtect, setInvitation);
/**
 * @controller get invitation by event id
 * @route /api/invitation/:id
 * @method GET
 * @description get invitation by event id
 * @access  private/user
 */
router.get("/:id", userProtect, getInvitationByEventId);

/**
 * @controller update invitation
 * @route /api/invitation/:id
 * @method PUT
 * @description update invitation
 * @access  private/admin
 */
router.put("/:id", adminProtect, updateInvitation);

export default router;
