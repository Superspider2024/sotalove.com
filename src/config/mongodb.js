const mongoose= require("mongoose")
require('dotenv').config()



const connect =async()=>{
    try{
        const bob=await mongoose.connect(process.env.db)
        if(bob){
        console.log("Successfully connected!")
        }else{
            throw new Error("Error connecting...")
        }
    }catch(e){
        console.log("Error connecting: ",e.message)
    }
}

module.exports=connect