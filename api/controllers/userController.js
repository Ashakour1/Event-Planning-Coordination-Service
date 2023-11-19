import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";

/**
 @controller register User
 @route /api/user/
 @method POST
 @description register user
 @body { name:String,email:String, password : String }
 @access Public
 */

export const registerUser = asyncHandler(async (req, res) => {
  // get data from body
  const { name, email, password } = req.body;

  // check if all fields are filled
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // find if user exists
  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // if user exists
  if (userExist) {
    res.status(400);
    throw new Error("User Already exists");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // return user response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.email),
      },
    },
  });
});

/**
 @controller login User
 @route /api/user/
 @method POST
 @description login user
 @body { name:String,email:String, password : String }
 @access Public
 */

export const loginUser = asyncHandler(async (req, res) => {
  // get data from body
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in the fields");
  }

  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // if user not exists
  if (!user) {
    res.status(400);
    throw new Error("user not exists");
  }

  // check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // if password not correct
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // return user response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.email),
      },
    },
  });
});

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
