const express=require("express")


const signup=async(req,res)=>{
    try{
    res.send("SIGN UP")
    }catch(e){
        console.log("Error in signup: ", e.message)
    }
    }


const login=async(req,res)=>{
    try{
    res.send("LOGIN")
    }catch(e){
        console.log("Error in login: ",e.message)
    }
}


module.exports={signup,login}