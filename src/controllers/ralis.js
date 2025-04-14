const express= require("express")
require("dotenv").config()
const {aphroditeConjecture}= require('../utilis/newpick.js')
const User= require("../models/user.js")
const {sign}= require('../services/jwt.js')
const Messages = require('../models/message.js')
const Chats = require('../models/chats.js')
const uploadToCloudinary = require("../services/upload.js")
const { TopologyDescription } = require("mongodb")


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
        const {user}= req.body;
        await User.updateOne(
            { username:req.body.username, },
            { $addToSet:{seen :user.username}}  
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

        if(property==="username"){
            return res.status(400).json("Can't update the username attribute")
        }
        const newlyUpdated= await User.findOneAndUpdate({username:req.user.username},{[property]:value},{new:true})
        if(!newlyUpdated){
            return res.status(500).json("Issue updating!")
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
        const x= req.user.gender===0?1:0;
        let users= await User.find({gender:x})
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
        allNothing=allNothing.filter(user=> user.school===school.toLowerCase()&& user.username!=req.body.username).map(user=> ({user,score:aphroditeConjecture(user,req.user)})).sort((a,b)=>b.score-a.score)
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

const meFind=async(req,res)=>{
    try{
        res.status(200).json({
            message:"Here is you",
            user:req.user
        })

    }catch(e){
        res.status(400).json("It wasn't found sorry!")
    }
}

const addChat=async(req,res)=>{
    try{
        const {username}= req.body;

        if(username===req.user.username){
            return res.status(400).json("Unfortunately, chatting to yourself will make a blackhole")
        }

        if(!username){
            return res.status(400).json('Provide data!')
        }
        const found = await User.findOneAndUpdate({username:username},{$addToSet:{chats:`${req.user.username.toLowerCase()}$${req.user.profilePic}`}},{new:true})
        const found1 = await User.findOneAndUpdate({username:req.user.username},{$addToSet:{chats:`${found.username.toLowerCase()}$${found.profilePic}`}},{new:true})
        console.log(found1)
        res.status(201).json({
            chatList:found1.chats
        })
        
    }catch(e){
        res.status(400).json("Issue wit starting the chat: "+ e.message)
    }
}

const deleteChat=async(req,res)=>{
    try{
        const theOne= await User.findOne({username:req.body.username})
        const user= `${req.body.username.toLowerCase()}$${theOne.profilePic}`

        if(!user){
            return res.status(400).json('Provide data!')
        }
        //Beware the chat data is never deleted its just deleted from the req.user's chatlist not even the recepient
        const lol= await User.findOneAndUpdate({username:req.user.username},{$pull:{'chats':user}},{new:true})
        res.status(201).json({
            chatList:lol.chats
        })
    }catch(e){
        res.status(400).json("Issue deleting chat: "+e.message)
    }
}

const chatList=async(req,res)=>{
    try{
        const user = await User.findOne({username:req.user.username})
        if(!user){
            return res.status(400).json("Issues finding the needed user!")
        }

        res.status(200).json({
            chatList:user.chats
        })
    }catch(e){
        res.status(400).json("Issues getting the chatlist")
    }
}

const findAnyone=async(req,res)=>{
    try{
        const {username}= req.body;
        if(!username){
            return res.status(400).json("PLease stop!")

        }
        const result = await User.findOne({username})

        res.status(200).json({
            user:result
        })
    }catch(e){
        res.status(400).json("Issue getting this data!")
    }
}

const findChats=async(req,res)=>{
    try{
        const {chatId}= req.body;
        if(!chatId){
            return res.status(400).json("Keep quiet!")
        }

        const fund = await Messages.find({chatId}).sort({ created: 1 })
        
        if(!fund){
            return res.status(400).json("This chats does not exist!")
        }

        res.status(200).json({
            chats:fund
        })
    }catch(e){
        res.status(400).json("Issue getting chats")
    }
}

const findLastMessage=async(req,res)=>{
    try{
        const {chatId,receiver}= req.body;
        const found = await Chats.findOne({chatId})
        const read= await Messages.findOne({chatId,sender:receiver,isRead:false})
        let isRead=true
        if(read){
            isRead=false
        }
        if(!found || !chatId){
            return res.status(400).json("Dont waste my time man!")
        }

        res.status(200).json({
            lastMessage:found.latestMessage,
            isRead,
        })
    }catch(e){
        res.status(400).json("Heelo there!")
    }
}

const upload=async(req,res)=>{
    try{
        const uploadFile= req.files?.uploadFile?.[0]
        if(!uploadFile){
            return res.status(400).json('Im tired for this!')

        }
        if (uploadFile) {
            const uploadOptions = {
                folder: 'satolove/uploads', 

                public_id: `image-${req.body.username || 'user'}-${Date.now()}`,
                resource_type: 'image' 
            };
            const uploadResult = await uploadToCloudinary(uploadFile.buffer, uploadOptions);
            const uploadUrl= uploadResult.secure_url
            
            if(!uploadUrl){
                return res.status(400).json('Somehting broke along the way!')
            }

            res.status(201).json({
                url:uploadUrl
            })
    }
    }catch(e){
        res.status(400).json("Uplaod denied!" + e.message)
    }


}

const notot=async(req,res)=>{
    try{
        const {username}= req.body;
        if(!username){
            return res.status(400).json("STOP!")
        }

        const updated = await User.findOneAndUpdate({username},{tutorialSeen:true})

        if(!updated){
            return res.status(400).json("User not found")

        }

        res.status(201).json("Updated!")

    }catch(e){
        res.status(400).json("hanks")
    }
}



module.exports={swipeleft,notot,swiperight,newpick,update,searchpage,searchAndFilter,meFind,addChat,deleteChat,chatList,findChats,findAnyone,findLastMessage,upload}
