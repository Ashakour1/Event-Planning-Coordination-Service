import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // if token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
          email: decoded.email,
        },
      });

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
