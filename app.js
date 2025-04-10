const express= require("express")
const nodeCron=require("node-cron")
const app=express()
const apex= require("./src/routes/apex.js")
const auth= require('./src/routes/auth.js')
const ralis= require("../backend/src/routes/ralis.js")
const connect=require("./src/config/mongodb.js")
const cors = require('cors');
require('dotenv').config()
const User = require("../backend/src/models/user.js")


PORT=process.env.PORT


connect()
app.use(cors())
app.use(express.json())

app.use('/',apex)
app.use('/auth',auth)
app.use('/ralis',ralis)

nodeCron.schedule("0 * * * *", async () => {
    console.log("⏰ Hourly reset starting...");
    await User.updateMany({}, { $set: { seen: [] } });
    console.log("✅ All users' seen lists cleared");
  });

app.listen(PORT,()=>{
    console.log("Server is running...")
})

//http://localhost:3000/

//PARTS:
//1:APEX-the main page,about page, terms and conditions DONE
//2:AUTH-The signup process and login process, account making process NOT DONE(HAVE TO WAIT TILL THE WEB APP BACKEND IS READY) DONE
//3:DATABASE AND MODELS-The mongodb models and dbs and how data is stored and utilized and managed DONE
//4:Main functioning of the app-The necessary functioninng of : DONE
//sliding and swiping,the main algorithmn,updating in genral, okay like updating status,school,form,age,images,profilepic,lookingfor,username.The search and filter according to school,status
//5:Images-cloudinary and images management


