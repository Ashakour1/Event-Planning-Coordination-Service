import express from "express";
import { getEvents,setEvent } from "../controllers/eventController.js";
const router = express.Router();




router.post("/",setEvent).get("/",getEvents);
router.put("/:id",).delete("/:id",);


export default router;