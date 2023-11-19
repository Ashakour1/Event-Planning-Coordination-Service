import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

/**
 * @controller Register vendor
 * @route /api/vendors/
 * @method POST
 * @description signup vendor
 * @body {email : string , password : string}
 * @access  public
 */

export const signupVendor = asyncHandler(async (req, res) => {
  //  get data from body
  const { name, email, password } = req.body;

  // check if all fields are filled
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check vendor exists
  const venderExist = await prisma.vendor.findUnique({
    where: {
      email,
    },
  });

  // check if vendor exists
  if (venderExist) {
    res.status(400);
    throw new Error("vendor already exists");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // create vendor
  const vendor = await prisma.vendor.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // return vendor data
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: {
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
        token: generateToken(vendor.id),
      },
    },
  });
});

/**
 * @controller Register vendor
 * @route /api/vendors/
 * @method POST
 * @description signup vendor
 * @body {email : string , password : string}
 * @access  public
 */

export const loginVendor = asyncHandler(async (req, res) => {
  //  get data from body
  const { email, password } = req.body;

  // check if all fields are filled
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // check vender Exist
  const venderExist = await prisma.vendor.findUnique({
    where: {
      email,
    },
  });

  // if vender not exist
  if (!venderExist) {
    res.status(400);
    throw new Error("vendor not found");
  }

  // check password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    venderExist.password
  );

  // if password not correct
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Invalid password");
  }

  // return vendor response
  res.status(200).json({
    success: true,
    error: null,
    results: {
      data: {
        id: venderExist.id,
        name: venderExist.name,
        email: venderExist.email,
        token: generateToken(venderExist.email),
      },
    },
  });
});

// generate Token

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
