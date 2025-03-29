const express= require("express")
const app=express()
const apex= require("./src/routes/apex.js")
const auth= require('./src/routes/auth.js')
const connect=require("./src/config/mongodb.js")
PORT=3000
connect()
app.use('/',apex)
app.use('/auth',auth)

app.listen(PORT,()=>{
    console.log("Server is running...")
})

//  http://localhost:3000/

//PARTS:
//1:APEX-the main page,about page, terms and conditions DONE
//2:AUTH-The signup process and login process, account making process NOT DONE(HAVE TO WAIT TILL THE WEB APP BACKEND IS READY)
//3:DATABASE AND MODELS-The mongodb models and dbs and how data is stored and utilized and managed DONE
//4:Main functioning of the app-The necessary functioninng of scrolling 
//5:Images-cloudinary and images management
