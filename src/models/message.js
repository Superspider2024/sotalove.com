const mongoose= require('mongoose')


const messagesSchema=mongoose.Schema({
    chatId:{type:String,lowercase:true,trim:true},
    sender:{type:String,lowercase:true,trim:true},
    content:{type:String},
    imageTrue:{type:Boolean},
    isRead:{type:Boolean},
    created:{type:Date,default:Date.now()}
})

const Messages= mongoose.model("Messages",messagesSchema)

module.exports=Messages;