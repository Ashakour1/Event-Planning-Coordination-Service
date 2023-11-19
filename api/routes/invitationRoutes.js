import express from "express";
import { getAllInvitations, getInvitationByEventId, setInvitation, updateInvitation } from "../controllers/invitationController.js";
import  adminProtect from "../middleware/adminAuthMiddleware.js";
import userProtect from "../middleware/userAuthMiddleware.js";



const router = express.Router();

router.get("/",adminProtect,userProtect, getAllInvitations).post("/",userProtect, setInvitation);
router.get("/:id",userProtect,getInvitationByEventId).put("/:id",adminProtect, updateInvitation);


export default router;