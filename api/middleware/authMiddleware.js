import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";

import prisma from "../config/prisma.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from the header
      token = req.headers.authorization.split("")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      // get user from the token
     
        req.user = await prisma.user.findUnique({   
          where: {
            id: decoded.id,
          },
        });
       

       
      // next
      next();
    } catch (err) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
  }
});


export default protect;