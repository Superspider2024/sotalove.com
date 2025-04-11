const cloud = require("cloudinary").v2
require("dotenv").config()


cloud.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET
})


module.exports=cloud;