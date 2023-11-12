import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

/**
 * @controller get all invitions
 * @route /api/invitions/
 * @method GET
 * @description get all invition
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
 * @description Set  invition
 * @body {eventId : string , userId : string}
 * @access  private/admin
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
  if(!eventExist){
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
    if(!userExist){
        res.status(400);
        throw new Error("User not found");
    }

    const invitationExist = await prisma.invitation.findFirst({

      where : {
        eventId : Number(eventId),
        userId : Number(userId),
      }
    })
    if(invitationExist){
      res.status(400);
      throw new Error("wait for the response");
    }

    // create invitation
    const invitation =  await prisma.invitation.create({
        data : {
            eventId : Number(eventId),
            userId : Number(userId),
            status : "pending",
        }
    })

    // return Invitation response
    res.status(200).json({
        success: true,
        error: null,
        results: {
          data: invitation,
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


export const updateInvitation = asyncHandler(async (req,res) =>{
    const {id} =  req.params;
    const {eventId,userId} = req.body;

    const foundInvitation = await prisma.invitation.findUnique({
        where : {
            id : Number(id),
        }
    })
   if(!foundInvitation){
       res.status(400);
       throw new Error(`Invitation with id ${id} does not exists`);
   }

   const updateInvitation = await prisma.invitation.update({
    where :{
        id : Number(id),
    },
    data : {
        eventId : Number(eventId) ,
        userId :  Number(userId),
        status : "accepted",
    }

   })
  //  return updated response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: updateInvitation,
    },
  });
})


/**
 * @controller get invitation by event id
 * @route /api/invitation/:id
 * @method GET
 * @description get invitation by event id
 * @access  private/admin
 */

export const getInvitationByEventId = asyncHandler(async (req,res) =>{

    const {id} = req.params;

    const foundInvitation = await prisma.invitation.findUnique({
        where : {
            id : Number(id),
        }
    })

    if(!foundInvitation){
        res.status(400);
        throw new Error(`Invitation with id ${id} does not exists`);
    }

    res.status(200).json({
        success: true,
        error: null,
        results: {
          data: foundInvitation,
        },
      });
})