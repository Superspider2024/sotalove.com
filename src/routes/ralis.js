const express= require("express")
const router=express.Router()
const {newpick,swipeleft,swiperight,update,searchpage,searchAndFilter,meFind,addChat,deleteChat,chatList}= require("../controllers/ralis.js")
const {flatmain}= require("../middleware/flat.js")



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









module.exports=router;