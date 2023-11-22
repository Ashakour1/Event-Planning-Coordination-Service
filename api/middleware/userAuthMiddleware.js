import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

const userProtect = asyncHandler(async (req, res, next) => {
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
      const user = await prisma.user.findUnique({
        where: {
          name: decoded.name,
          email: decoded.email,
        },
      });
      req.user = user;

      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user access required");
      }

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

export default userProtect;
