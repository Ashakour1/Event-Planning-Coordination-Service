import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

/**
 * @controller get all vendorApplications
 * @route /api/vendorApplications/
 * @method GET
 * @description get all vendorApplications
 * @access  private/admin
 */

export const getAllVendorApplications = asyncHandler(async (req, res) => {
  const vendorApplications = await prisma.vendorApplications.findMany();

  if (vendorApplications == 0) {
    res.status(400);
    throw new Error("No vendorApplications found");
  }

  // return vendorApplications response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: vendorApplications,
    },
  });
});

/**
 * @controller set vendorApplication
 * @route /api/vendorApplication/
 * @method POST
 * @description set vendorApplication
 * @body {eventId : string , vendorId : string}
 * @access  private/admin
 */

export const setVendorApplication = asyncHandler(async (req, res) => {
  const { eventId, vendorId } = req.body;

  // check if all fields are filled
  if (!eventId || !vendorId) {
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

  // check if vendorExist exists
  const vendorExist = await prisma.vendor.findUnique({
    where: {
      id: Number(vendorId),
    },
  });

  if (!vendorExist) {
    res.status(400);
    throw new Error("Vendor not exists");
  }

  const existVendorApplications = await prisma.vendorApplications.findFirst({
    where: {
      eventId: Number(eventId),
      vendorId: Number(vendorId),
    },
  });

// if vendor has already sent an invitation for this event
  if (existVendorApplications) {
    res.status(400);
    throw new Error("Vendor has already sent an invitation for this event");
  }

  // create vendorApplication
  const vendorApplication = await prisma.vendorApplications.create({
    data: {
      eventId: Number(eventId),
      vendorId: Number(vendorId),
      status: "pending",
    },
  });

  // return vendorApplication response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: vendorApplication,
    },
  });
});

/**
 * @controller update vendorApplication
 * @route /api/vendorApplication/:id
 * @method PUT
 * @description update vendorApplication
 * @body {eventId : string , vendorId : string}
 * @access  private/admin
 */
export const updateVendorApplication = asyncHandler(async (req, res) => {
  const { eventId, vendorId } = req.body;
  const { id } = req.params;

  // check if all fields are filled
  if (!eventId || !vendorId) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check if eventExist exists
  const eventExist = await prisma.event.findUnique({
    where: {
      id: Number(eventId),
    },
  });
//   if event not exist
  if (!eventExist) {
    res.status(400);
    throw new Error("Event not found");
  }
  // check if vendorExist exists
  const vendorExist = await prisma.vendor.findUnique({
    where: {
      id: Number(vendorId),
    },
  });
//   if vendor not exist
  if (!vendorExist) {
    res.status(400);
    throw new Error("Vendor not exists");
  }
  // updateVendorApplication
  const vendorApplication = await prisma.vendorApplications.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      eventId: Number(eventId),
      vendorId: Number(vendorId),
      status: "accepted",
    },
  });

  // return vendorApplication response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: vendorApplication,
    },
  });
});

/**
 * @controller get vendorApplication
 * @route /api/vendorApplication/:id
 * @method DELETE
 * @description get  vendorApplication byiD
 * @access  private/admin
 */

export const getVendorApplicationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // check if vendorApplication exists
  const vendorApplication = await prisma.vendorApplications.findUnique({
    where: {
      id: Number(id),
    },
  });

  // if vendorApplication not exist
  if (!vendorApplication) {
    res.status(400);
    throw new Error("your Application not found");
  }

//   check  vendor exist
  const venderExist = await prisma.vendor.findUnique({
    where: {
      id: Number(id),
    },
  });

  //   if vendor  not exist
  if (!venderExist) {
    res.status(400);
    throw new Error("Vendor not found");
  }

  // return vendorApplication response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: vendorApplication,
    },
  });
});
