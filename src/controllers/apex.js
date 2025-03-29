const express= require("express")


const main=async(req,res)=>{
    try{
    res.send("this is main page!")
    }catch(e){
        console.log("Error in 'main' controller of apex router: ", e.message)
    }
}

const about=async(req,res)=>{
    try{
    res.send("this is about page!")
    }catch(e){
        console.log("Error in 'about' controller of apex router: ", e.message)
    }
}

const terms=async(req,res)=>{
    try{
    res.send("A bunch of terms")
    }catch(e){
        console.log("Error in 'terms' controller of apex router", e.message)
    }
}


module.exports={about,main,terms}