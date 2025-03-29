const mongoose= require('mongoose')

//SCHOOLSCHEMA AND DATA MODELLING

const schoolSchema=mongoose.Schema({
    schoolname:{type:String,required:true},
    County:{type:String,required:true},
    joined:{type:Date,default:Date.now()}
})

const School= mongoose.model("Schools",schoolSchema)

module.exports=School;