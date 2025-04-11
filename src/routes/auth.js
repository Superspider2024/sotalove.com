const express= require("express")
const router=express.Router()
const {login,signup,deleteuser,deletepage}= require("../controllers/auth.js")
const { flatmain } = require("../middleware/flat.js")
const uploadFile= require('../middleware/multer.js')


//Authentication routes

router.post("/signup",uploadFile,signup)
router.post("/login",login)
router.post("/deleteuser",deleteuser)
router.get("/deletepage",flatmain,deletepage)


module.exports=router;