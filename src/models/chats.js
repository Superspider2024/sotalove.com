const mongoose= require('mongoose')


const chatsSchema=mongoose.Schema({
    chatId:{type:String,unique:true,lowercase:true,trim:true},
    partipants:{type:Array,lowercase:true,trim:true},
    latestMessage:{type:String,lowercase:true,trim:true},
    images:{type:Array,lowercase:true,trim:true},
    lastUpdated:{type:Date,lowercase:true,trim:true}
})

const Chats= mongoose.model("Chats",chatsSchema)

module.exports=Chats;