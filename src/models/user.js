const mongoose= require('mongoose')

//USERSCHEMA AND DATA MODELLING

const userSchema=mongoose.Schema({
    instagramId: { type: String, required: true, unique: true }, 
    username: { type: String, required: true, unique:true },
    status:{type:String, required:true, default:"Single"},
    school:{type:String,required:true},
    form:{type:Number,required:true},
    lookingfor:{type:String,required:true},
    profilePic: { type: String, required:true},
    images:{type:Array}, 
    accessToken: { type: String, required:true }, 
    joinedAt: { type: Date, default: Date.now } 
})

const User= mongoose.model("Users",userSchema)

module.exports=User;