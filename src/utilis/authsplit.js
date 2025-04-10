const express= require("express")
const jwt=require("jsonwebtoken")


const split=(req)=>{
    let bro= req.headers["authorization"];
    
    bro=bro && bro.split(" ")[1]
    return bro;
}

module.exports={split}