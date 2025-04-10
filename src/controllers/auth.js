const express=require("express")
const User= require("../models/user.js")
const harsh= require("bcrypt");
const jwt= require("jsonwebtoken")
require("dotenv").config()
const {sign}= require('../services/jwt.js')


const signup=async(req,res)=>{
    try{
    const {username,password,status,school,age,lookingFor,profilePic,gender,schoolPreference,images}= req.body;
    if(!username || !password || !school || !age || !lookingFor || !profilePic || gender===undefined || !schoolPreference){
        res.status(400).json("ERROR IN SIGNUP: LACKS USER INPUT! ")
        return
    }



    const youthere= await User.findOne({username})
    if(youthere){
        res.status(400).json("ERROR IN SIGNUP: THIS USER ALRADY EXISTS ")
        return
    }

    const salt= await harsh.genSalt(10)
    const hashedPassword=await harsh.hash(password,salt)


    const newUser = await User.create({
        username,
        password:hashedPassword,
        status,
        school,
        age,
        lookingFor,
        profilePic,
        gender,
        schoolPreference,
        images,
        
    })
    await newUser.save()
    

    if(newUser){
        res.status(201).json({
            message:"SUCESS LOL, user made!",
            accesstoken:await sign(newUser)
        })
    }else{
        res.status(400).json("ERROR IN SIGNUP: ISSUE MAKING USER")
        return
    }

    }catch(e){
        res.status(400).json("Error in signup: "+ e.message)
        return
    }
    }


const login=async(req,res)=>{
    try{
    const {username,password}= req.body;
    
    if ( !username || !password){
        res.status(400).json("ERROR IN LOGIN:Lacks input data!")
        return
    }

    const hopethere= await User.findOne({username})
    if(!hopethere){
        res.status(400).json("ERROR IN LOGIN:This user does not exist!")
        return
    }

    const please= await harsh.compare(password,hopethere.password)
    if(!please){
        res.status(400).json("ERROR IN LOGIN: WRONG PASSWORD!")
        return
    }
    res.status(200).json({
        message:"SUCESS LOL",
        accesstoken:await sign(hopethere)
    })
    

    }catch(e){
        res.status(400).json("ERROR IN LOGIN: "+ e.message)
    }
}



const deleteuser = async(req,res)=>{
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: "Instagram ID is required" });
        }

        if(username!=req.user.username){
            return res.status(401).json("Be ashamed and delete your own account")
        }


        const result = await User.deleteOne({ username });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deletepage =async(req,res)=>{
    try{
        res.status(200).json({
            "Message":"To delete your user data please send a POST request to https://sotalove.up.railway.app/auth/deleteuser with the reust body containnig a 'username' property which holds the username your instagram username you signed up with.Thanks!",
            "URL":"https://sotalove.up.railway.app/auth/deleteuser",
            "contact":"diginalrogue@gmail.com"
        })
    }catch(e){
        console.log("Error at 'deletepage' controller in router 'auth': "+e.message)
        res.status(500).json("Issue loading up page!")
    }
}


module.exports={signup,login,deleteuser,deletepage}