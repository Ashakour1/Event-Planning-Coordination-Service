import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
/** 
@controller signup  Admin 
@route /api/admin/
@method POST 
@description signup  admin 
@body {name: String, email: String , password: String} -  name , email and password
@access  public
*/

export const registerAdmin = asyncHandler(async (req, res) => {
  // get data from req.body
  const { name, email, password } = req.body;

  // check if all fields are filled
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check  admin exists
  const adminExist = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  // check if admin exists
  if (adminExist) {
    res.status(400);
    throw new Error("admin already exists");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // create admin
  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // return admin response
  res.status(201).json({
    success: true,
    error: null,
    results: {
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(adminExist.id,adminExist.email),
      },
    },
  });
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
  // get email and password from req.body
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check  admin exists
  const adminExist = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  // check if admin not exists
  if (!adminExist) {
    res.status(400);
    throw new Error("Admin not exists");
  }

  // check password
  const isPasswordCorrect = await bcrypt.compare(password, adminExist.password);

  // if password not correct
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid password");
  }

  // return login admin response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: {
        id: adminExist.id,
        name: adminExist.name,
        email: adminExist.email,
        token: generateToken(adminExist.id,adminExist.email),
      },
    },
  });
});

const generateToken = (id,email) => {
  return jwt.sign({ id,email }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
