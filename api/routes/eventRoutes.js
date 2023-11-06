import express from "express";
import { getEvents,setEvent , updateEvent,deleteEvent} from "../controllers/eventController.js";
const router = express.Router();




router.post("/",setEvent).get("/",getEvents);
router.put("/:id",updateEvent).delete("/:id",deleteEvent);


export default router;