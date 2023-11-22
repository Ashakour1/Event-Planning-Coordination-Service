import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

/**
 * @controller get all invitations
 * @route /api/invitation/
 * @method GET
 * @description get all invitation
 * @access  private/admin
 */

export const getAllInvitations = asyncHandler(async (req, res) => {
  const Invitation = await prisma.invitation.findMany();

  if (Invitation == 0) {
    res.status(404);
    throw new Error("No Invitations found");
  }

  // return Invitation response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: Invitation,
    },
  });
});

/**
 * @controller Set  invitation
 * @route /api/invitation/
 * @method POST
 * @description Set  invitation
 * @body {eventId : string , userId : string}
 * @access  private/admin/user
 */

export const setInvitation = asyncHandler(async (req, res) => {
  // get data from body
  const { eventId, userId } = req.body;

  // check if all fields are filled
  if (!eventId || !userId) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check if eventExist exists
  const eventExist = await prisma.event.findUnique({
    where: {
      id: Number(eventId),
    },
  });

  // if event not exist
  if (!eventExist) {
    res.status(400);
    throw new Error("Event not found");
  }

  // check if userExist exists
  const userExist = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  // if user not exist
  if (!userExist) {
    res.status(400);
    throw new Error("User not found");
  }

  // check if invitationExist exists
  const invitationExist = await prisma.invitation.findFirst({
    where: {
      eventId: Number(eventId),
      userId: Number(userId),
    },
  });
  // if user has already sent an invitation for this event
  if (invitationExist) {
    res.status(409);
    throw new Error("Duplicate Invitation. Please wait for the response.");
  }

  // create invitation
  const invitation = await prisma.invitation.create({
    data: {
      eventId: Number(eventId),
      userId: Number(userId),
      status: "pending",
    },
  });

  // return Invitation response
  res.status(201).json({
    status: 201,
    success: true,
    error: null,
    results: {
      data: {
        message : "Invitation sent successfully"
      }
    },
  });
});

/**
 * @controller update invitation
 * @route /api/invitation /:id
 * @method PUT
 * @description update invitation
 * @access  private/admin
 */

export const updateInvitation = asyncHandler(async (req, res) => {
  // get id from params
  const { id } = req.params;
  // get data from body
  const { eventId, userId } = req.body;

  // check if eventExist exists
  const foundInvitation = await prisma.invitation.findUnique({
    where: {
      id: Number(id),
    },
  });
  // check if invitation exists
  if (!foundInvitation) {
    res.status(400);
    throw new Error(`Invitation with id ${id} does not exists`);
  }

  // event updated
  const updateInvitation = await prisma.invitation.update({
    where: {
      id: Number(id),
    },
    data: {
      eventId: Number(eventId),
      userId: Number(userId),
      status: "Accepted",
    },
  });
  //  return updated response
  res.status(201).json({
    status: 201,
    success: true,
    error: null,
    results: {
      data: updateInvitation,
    },
  });
});

/**
 * @controller get invitation by event id
 * @route /api/invitation/:id
 * @method GET
 * @description get invitation by event id
 * @access  private/user
 */

export const getInvitationByEventId = asyncHandler(async (req, res) => {
  // get id from params
  const { id } = req.params;

  // check if eventExist exists
  const foundInvitation = await prisma.invitation.findUnique({
    where: {
      id: Number(id),
    },
  });

  // if invitation not exist
  if (!foundInvitation) {
    res.status(400);
    throw new Error(`Invitation with id ${id} does not exists`);
  }

  // return Invitation response
  res.status(201).json({
    status : 201,
    success: true,
    error: null,
    results: {
      message: "Invitation accepted",
    },
  });
});
