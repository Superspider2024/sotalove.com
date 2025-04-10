//This is like the flat defence fo the jwt tokens so like to protect pages that at least need a jwt token which is over 50%.
const jwt= require("jsonwebtoken")
require("dotenv").config()
const {flat}= require("../utilis/flat.js")
const express= require("express")
const {split}= require("../utilis/authsplit.js")
const User= require("../models/user.js")

const flatmain=async(req,res,next)=>{
    try{
    const lol=await flat(req,res)
    if(!lol){
        throw new Error("Issue with security!")
    }
    req.user=await User.findOne({username:lol.username})
    if(!req.user){
        throw new Error("Issue connecting user to server...")
    }
    next()
    }catch(e){
        res.status(401).json("ERROR: "+ e.message)
    }
}

module.exports={flatmain}