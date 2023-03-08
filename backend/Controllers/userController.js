// const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

module.exports = {
    registerUser: asyncHandler( async (req,res)=>{
        let {firstname,lastname,email,mobile,password} =req.body
        const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Already exists");
    }
        password = await bcrypt.hash(password,10)
        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            mobile
        })
        if(user){
            res.status(201).json({
                _id:user._id,
                firstname:user.first,
                lastname:user.lastname,
                email:user.email, 
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            }) 
            console.log(user)
        }
       
        else{
            res.status(400);
            throw new Error("Error Occured!");
        }
    }),
    authUser: asyncHandler(async  (req,res)=>{
        try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        console.log(user)
        if(user && user.matchPassword(password)){
            
            res.json({
                _id:user._id,
                firstname:user.first,
                lastname:user.lastname,
                email:user.email, 
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(401).json({message:"Invalid email or password"})
            throw new Error("Invalid email or password")
        }
    }catch(error){
        console.log(error.message)
    }
        
    })
}