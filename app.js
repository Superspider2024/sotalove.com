const express= require("express")
const app=express()
const apex= require("./src/routes/apex.js")
const auth= require('./src/routes/auth.js')
const connect=require("./src/config/mongodb.js")
const cors = require('cors');
const passport = require("passport");
require('dotenv').config()


PORT=process.env.PORT


connect()
app.use(cors())
app.use(passport.initialize());
app.use(express.json())

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


// CODE NEEDED FOR JAVASCIPTS SDK FOR INSTA AUTH: 
//<script>
  //window.fbAsyncInit = function() {
    //FB.init({
      //appId      : '{your-app-id}',
      //cookie     : true,
      //xfbml      : true,
      //version    : '{api-version}'
    //});
      
    //FB.AppEvents.logPageView();   
      
  //};

  //(function(d, s, id){
    // var js, fjs = d.getElementsByTagName(s)[0];
    // if (d.getElementById(id)) {return;}
    // js = d.createElement(s); js.id = id;
     //js.src = "https://connect.facebook.net/en_US/sdk.js";
     //fjs.parentNode.insertBefore(js, fjs);
   //}(document, 'script', 'facebook-jssdk'));
//</script>
