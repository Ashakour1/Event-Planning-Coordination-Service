import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

/**
 * @controller get all events
 * @route /api/events/
 * @method GET
 * @description get all event
 * @access  private/admin
 */
export const getEvents = asyncHandler(async (req, res) => {
  const event = await prisma.event.findMany();

  if (event == 0) {
    res.status(404);
    throw new Error("No events found");
  }

  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: event,
    },
  });
});

/**
 * @controller create event
 * @route /api/events/
 * @method POST
 * @description create event
 * @body {adminId : string , title : string , description : string , location : string, price : Float , date : string}
 * @access  private/admin
 */
export const setEvent = asyncHandler(async (req, res) => {
  // get data from body
  const { adminId, title, description, location, price, date } = req.body;

  // check if all fields are filled
  if (!adminId || !title || !description || !location || !price || !date) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check if price is a number
  if (isNaN(price)) {
    res.status(400);
    throw new Error("Price must be a number");
  }

  // check exist admin
  const admin = await prisma.admin.findUnique({
    where: {
      id: Number(adminId),
    },
  });

  // if admin not exist
  if (!admin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  // create event
  const event = await prisma.event.create({
    data: {
      adminId,
      title,
      description,
      location,
      price,
      date,
    },
  });

  if (!event) {
    res.status(400);
    throw new Error("event not created");
  }

  res.status(201).json({
    success: true,
    error: null,
    results: {
      data: event,
    },
  });
});

/**
 * @controller update event
 * @route /api/events/:id
 * @method PUT
 * @description update event
 * @access  private/admin
 */
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { adminId, title, description, location, price, date } = req.body;

  // check admin exist
  const admin = await prisma.admin.findUnique({
    where: {
      id: Number(adminId),
    },
  });

  if (!admin) {
    res.status(400);
    throw new Error("Admin not found");
  }

  // check  event exist
  const foundEvent = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
  });

  // if event not exist
  if (!foundEvent) {
    res.status(400);
    throw new Error(`event with id ${id} does not exists`);
  }

  // update event
  const updatedEvent = await prisma.event.update({
    where: {
      id: Number(id),
    },
    data: {
      adminId,
      title,
      description,
      location,
      price,
      date,
    },
  });

  // return updated response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: updatedEvent,
    },
  });
});

/**
 * @controller deleteEvent
 * @route /api/event/:id
 * @method DELETE
 * @description delete event
 * @access  private/admin
 */
export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const foundEvent = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!foundEvent) {
    res.status(400);
    throw new Error(`event with id ${id} does not exists`);
  }

  const event = await prisma.event.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200);
  res.json({
    success: true,
    error: null,
    results: {
      data: event,
    },
  });
});
