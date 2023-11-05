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
  const { name, email, password } = req.body;

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

  if (user) {
    res.status(200);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
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
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in the fields");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      message: "Already Login successfully",
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("User Not found");
  }
});

export const getUserData = asyncHandler(async (req, res) => {
  res.json({
    message : "user data display"
  })
});

const generateToken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET, { expiresIn: "30d" });
};
