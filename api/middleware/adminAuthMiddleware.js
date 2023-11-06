import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

const adminProtect =  asyncHandler(async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{

        // get token
        token = req.headers.authorization.split(" ")[1];

        //  verify token

        const decoded = jwt.verify(token,process.env.JWT_SECRET);


        // get user from token
        req.admin = await prisma.admin.findUnique({
            where : {
                id : decoded.id
            }
        })

        // next 
        next();

    }catch(error){
        res.status(400)
        throw new Error("Not authorized, token failed");

    }

}

// if no token throw error
if(!token){
    res.status(401);
    throw new Error("Not authorized, no token");
}
})

export default adminProtect