import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
/** 
@controller register  Admin 
@route /api/admin/
@method POST 
@description register  admin 

@body {name: String, email: String , password: String} -  name , email and password

@access  public
*/

export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const adminExist = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  //   check if admin exists

  if (adminExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  // hash password

  const hashPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  if (admin) {
    res.status(201);
    res.json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      token : generateToken(admin.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

/** 
@controller login Admin 
@route /api/admin/login
@method POST 
@description login admin

@body { email: String , password: String} -  email and password

@access  public
*/

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200);
    res.json({
      message: "Admin login successfully",
      token : generateToken(admin.id),

    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// })

const generateToken = id => {

    return jwt.sign({id},process.env.JWT_SECRET , {expiresIn : "30d"})
}
