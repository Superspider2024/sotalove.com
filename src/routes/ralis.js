const express= require("express")
const router=express.Router()
const {newpick,swipeleft,swiperight,update,searchpage,notot,searchAndFilter,meFind,addChat,deleteChat,chatList,findChats, findAnyone, findLastMessage,upload}= require("../controllers/ralis.js")
const {flatmain}= require("../middleware/flat.js")
const {uploadFile2} = require("../middleware/multer.js")



//swiping functions-> so look theres a feature swipe right if you like and swipe left if you like
router.post("/swiperight",flatmain, swiperight)
router.post("/swipeleft",flatmain,swipeleft)
router.get("/newpick",flatmain,newpick)

//updating everything!
router.post("/update",flatmain,update)

//Search and filter
router.post("/search",flatmain,searchAndFilter)
router.get("/searchpage",flatmain,searchpage)

//Data getting
router.get("/me", flatmain,meFind);
router.post("/addchat",flatmain,addChat)
router.post("/deletechat",flatmain,deleteChat)
router.get("/chatlist",flatmain,chatList)

//get chats
router.post("/chats",flatmain,findChats)
router.post("/findanyone",flatmain,findAnyone)
router.post("/findlastmessage",flatmain,findLastMessage)


//upload file
router.post("/upload",flatmain,uploadFile2,upload)

//no tutorial
router.post("/notot",notot)








module.exports=router;