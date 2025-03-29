const express= require("express")
const router= express.Router()
const {main,about,terms}= require("../controllers/apex.js")
//The apex routes

router.get("/",main)

router.get("/about",about)

router.get("/terms",terms)

module.exports=router;