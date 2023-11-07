import express from "express";
import { getEvents,setEvent , updateEvent,deleteEvent} from "../controllers/eventController.js";
import adminProtect from "../middleware/adminAuthMiddleware.js";
import protect from "../middleware/userAuthMiddleware.js";
const router = express.Router();




router.post("/",adminProtect,setEvent).get("/",protect,adminProtect,getEvents);
router.put("/:id",adminProtect,updateEvent).delete("/:id",adminProtect,deleteEvent);


export default router;