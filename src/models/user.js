const mongoose= require('mongoose')

//USERSCHEMA AND DATA MODELLING

const userSchema=mongoose.Schema({
    username: { type: String,required:true, unique:true,trim:true },//
    password:{type:String,required:true,trim:true},//
    gender:{type:Number,required:true,trim:true,enum:[0,1]},//
    status:{type:String, default:"single",trim:true, lowercase:true, enum:["single","boyfriend/girlfriend","talking","married","situationship","friends with benefits","open realtionship","dating"]},//
    school:{type:String,trim:true,lowercase:true},//
    schoolPreference:{type:Array,trim:true,lowercase:true,required:true},
    age:{type:Number,trim:true},//
    lookingFor:{type:String,trim:true,lowercase:true},//
    profilePic: { type: String, required:true,trim:true},//
    images:{type:Array,trim:true},//
    rightUsers:{type:Array,trim:true},
    elo:{type:Number,trim:true,default:1000},
    seen:{type:Array,trim:true},
    matches:{type:Array,trim:true},   
    joinedAt: { type: Date, default: Date.now },
    chats:{type:Array,trim:true, lowercase:true},
    tutorialSeen:{type:Boolean,default:false}
})

const User= mongoose.model("Users",userSchema)

module.exports=User;

//username,password,status,school,age,lookingfor,profilepic,images,schoolPreference,gender