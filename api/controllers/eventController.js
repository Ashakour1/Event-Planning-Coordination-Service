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
  try {
    const { adminId, title, description, location, price, date } = req.body;

    if (!adminId || !title || !description || !location || !price || !date) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }

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

    res.status(201);
    res.json({
      event,
    });
  } catch (error) {
    res.status(400);
    throw new Error("event not created");
  }
});

export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const { adminId, title, description, location, price, date } = req.body;
  try {
    const event = await prisma.event.update({
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

    if (!event) {
      res.status(400);
      throw new Error("event not updated");
    }
    res.status(201);
    res.json({
      message: "event updated successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error("event not found");
  }
});

export const deleteEvent = asyncHandler(async (req, res) => {

  try {
    const { id } = req.params;
    const event = await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });
    if (!event) {
      res.status(400);
      throw new Error("event not found");
    }
    res.status(200);
    res.json({
      event,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Event not found");
  }
});
