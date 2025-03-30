const express= require("express")
const router= express.Router()
const {main,about,terms,privacypolicy}= require("../controllers/apex.js")
//The apex routes

router.get("/",main)

router.get("/about",about)

router.get("/terms",terms)

router.get("/privacypolicy",privacypolicy)

module.exports=router;