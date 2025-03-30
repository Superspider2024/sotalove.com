const express= require("express")
const router=express.Router()
const {login,signup,complete,authentic,authorize,completepage,rediretsuccess,deleteuser,deletepage}= require("../controllers/auth.js")
const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
const axios = require("axios");

//Authentication routes

router.post("/signup",signup)
router.post("/login",login)
router.get("/instagram",authentic);
router.get("/instagram/callback",passport.authenticate("instagram", {session:false}),authorize)
router.get("/redirectsuccess",rediretsuccess)
router.post("/complete",complete)
router.get("/completepage",completepage)
router.post("/deleteuser",deleteuser)
router.get("/deletepage",deletepage)


module.exports=router;