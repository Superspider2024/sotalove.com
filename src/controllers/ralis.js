const express= require("express")
require("dotenv").config()
const {aphroditeConjecture}= require('../utilis/newpick.js')
const User= require("../models/user.js")
const {sign}= require('../services/jwt.js')


//SWIPING AND ALGORITHMN CODE

const newpick = async(req,res)=>{
    try{
        let x=0

        if(!req.user){
            res.status(500).json("Issue with server!")
        }
        if(req.user.gender===0){
            x=1
        }
        const neededUsers=await User.find({gender:x})
        neededUsers.filter(user=> !req.user.seen.includes(user.username)).map(user =>({
            user,
            score:aphroditeConjecture(user,req.user)
        })).sort((a,b)=>b.score-a.score);

        if(!neededUsers){
            res.status(500).json("Issue with server!")
            return
        }

        res.status(200).json({
            message:"It was a success the Aphrodite Conjecure picked a whole new set of users",
            userPick:neededUsers,
        })

    }catch(e){
        res.status(400).json("ERROR: "+e.message)

    }
}

const swiperight = async(req,res)=>{
    try{
        //!!NOTE!! THE ASSUMPTION IS THAT THE FRONTEND WIIL SEND THE WHOLE USER DB OBJECT 
        
        const {user}= req.body;
        let match=false

        if(user.rightUsers.includes(req.user.username)){
            Promise.all([
                await User.updateOne(
                    { username:req.user.username },
                    { $addToSet:{seen :user.username ,rightUsers:user.username, matches:user.username}}  
                  ),
                await User.updateOne(
                    {username:user.username},
                    { $addToSet:{matches:req.user.username}}
                )

            ])
            match=true
        }else{

            await User.updateOne(
                { username:req.user.username },
                { $addToSet:{seen :user.username ,rightUsers:user.username}}  
            );
        }

        res.status(201).json({
            message:"Success!",
            match,
        })
    }catch(e){
        res.status(400).json("ERROR: "+e.message)
    }
}

const swipeleft = async(req,res)=>{
    try{
        const {user1}= req.body;
        await User.updateOne(
            { username:user1.username, },
            { $addToSet:{seen :username}}  
          );

        res.status(201).json("SUCCESS")

    }catch(e){
        res.status(400).json("ERROR: "+e.message)
    }
}

//Updating

const update=async(req,res)=>{
    try{
        //FOR THE PROPETIES THAT ARE IN ARRAYS WE EXPECT THE FRONTEND TO SEND THEM AS ARRAYS!
        const {property,value}=req.body
        if(property==="schoolPreference" || property==="images" && typeof(value)!=Array){
            return res.status(400).json("Sent the wrong data type for the property given, please send an array")
        }
        const newlyUpdated= await User.findOneAndUpdate({username:req.user.username},{[property]:value},{new:true})
        if(!newlyUpdated){
            return res.status(500).json("Issue updating!")
        }

        if(property==="username"){
            res.status(201).json({
                message:`Updated the ${property} property`,
                accesstoken: await sign(newlyUpdated),
                user:newlyUpdated
            })
            return
        }
        
        res.status(201).json({
            message:`Updated the ${property} property`,
            user:newlyUpdated
        })
    }catch(e){
        res.status(400).json("ERROR IN UPDATING: "+e.message)
    }
}


//SEARCH AND FILTER

const searchpage=async(req,res)=>{
    try{
        let users= await User.find()
        users=users.map(user=> ({user,score:aphroditeConjecture(user,req.user)})).sort((a,b)=>b.score-a.score)
        if(!users){
            return res.status(400).json("Issue with the database")
        }
        res.status(200).json({
            message:"Fetch was a success",
            users,
        })
    }catch(e){
        res.status(400).json("Issue from the database: "+e.message)
    }
}

const searchAndFilter= async(req,res)=>{
    try{
        //Please frontend if you want no filter on a property send the interger value as 0.
        //Also frontend be sending the filter as school and staus as a whole so we can do an equal and whole update
        const {status,school}=req.body
        if(status===undefined || school===undefined){
            return res.status(400).json("Plase send some actual input")
        }
        let users= await User.find()
        if(!users){
            return res.status(400).json("Database failed")
        }
        if(status===0 && school===0){
            res.status(200).json({
                message:"Fetch was a success",
                users:users.map(user=> ({user,score:aphroditeConjecture(user,req.user)})).sort((a,b)=>b.score-a.score)
            })
            return
        }
        if(status===0 && school!=0){
            const allStatus= users.filter(user=>user.school===school.toLowerCase() ).map(user=> ({user,score:aphroditeConjecture(user,req.user)})).sort((a,b)=>b.score-a.score)
            if(!allStatus){
                return res.status(400).json("Database failed")
            }
            res.status(200).json({
                message:"Fetch was a success",
                users:allStatus
            })
            return
        }
        if(status!=0 && school===0){
            const allSchool= users.filter(user=>user.status===status.toLowerCase()).map(user=> ({user,score:aphroditeConjecture(user,req.user)})).sort((a,b)=>b.score-a.score)
            if(!allSchool){
                return res.status(400).json("Database failed")
            }
            res.status(200).json({
                message:"Fetch was a success",
                users:allSchool
            })
            return
        }
        let allNothing = users.filter(user=> user.status===status.toLowerCase())
        allNothing=allNothing.filter(user=> user.school===school.toLowerCase()).map(user=> ({user,score:aphroditeConjecture(user,req.user)})).sort((a,b)=>b.score-a.score)
        if(!allNothing){
            return res.status(400).json("Database failed")
        }
        res.status(200).json({
            message:"Fetch was a success",
            users:allNothing
        })
    }catch(e){
        res.status(400).json("Error with the database: "+e.message)
    }
}

module.exports={swipeleft,swiperight,newpick,update,searchpage,searchAndFilter}
