import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';

 const registerAdmin = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const userExists = await prisma.admin.findUnique({
        where :{
            email
        }
    })

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    // hash password

    const hashPassword =  await bcrypt.hash(password,10);

    const user =  await prisma.admin.create({
        data : {
            name,
            email,
            password : hashPassword
        }
        
    })

    if(user){
        res.status(200).json({
           message : "Admin created successfully"
        })
    }
})



export default registerAdmin;