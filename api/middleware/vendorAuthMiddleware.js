import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

const vendorProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get vendor from token
      req.vendor = await prisma.vendor.findUnique({
        where: {
          id: decoded.id,
        },
      });
      //
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Not authorized, No token vendor");
  }
});

export default vendorProtect;
