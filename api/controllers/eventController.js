import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

export const getEvents = asyncHandler(async (req, res) => {
  const event = await prisma.event.findMany();

  if (event == 0) {
    res.status(404);
    throw new Error("No events found");
  }

  res.json({
    event,
  });
});

export const setEvent = asyncHandler(async (req, res) => {
  const { adminId, title, description, location, price ,date} = req.body;

  
  const event = await prisma.event.create({
    data: {
      adminId,
      title,
      description,
      location,
      price,
      date : new Date(date)
    },
  });

  if (!event) {
    res.status(400);
    throw new Error("please create event");
  }else{
    res.status(200)
    res.json({
        message: "Event created successfully",
      });
  }
  
});
