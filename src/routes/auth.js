const express= require("express")
const router=express.Router()
const {login,signup,deleteuser,deletepage}= require("../controllers/auth.js")
const { flatmain } = require("../middleware/flat.js")


//Authentication routes

router.post("/signup",signup)
router.post("/login",login)
router.post("/deleteuser",flatmain,deleteuser)
router.get("/deletepage",flatmain,deletepage)


module.exports=router;