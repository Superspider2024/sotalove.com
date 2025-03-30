const express=require("express")
const passport=require("../services/passport.js")
const User= require("../models/user.js")


const signup=async(req,res)=>{
    try{
    res.send("SIGN UP")
    }catch(e){
        res.status(500).json("Error in signup: ", e.message)
        console.log("Error in signup: ", e.message)
    }
    }


const login=async(req,res)=>{
    try{
    res.send("LOGIN")
    }catch(e){
        res.status(500).json("Error in login: ",e.message)
        console.log("Error in login: ",e.message)
    }
}

const complete= async(req,res)=>{
    try{
        const {status,school,form,lookingfor,images,username}= req.body
        if(!status,!school,!form,!lookingfor){
            throw new Error("Please add")
        }
        let user1= await User.findOne({username,})

        if(!user1){
            throw new Error("This user does not exist, something went wrong with registration with your instagram user!")
        }

        user1=await User.findOneAndUpdateOne({username,},{status,school,lookingfor,images},{new:true})

        res.status(201).json({data:user1})
    }catch(e){
        res.status(500).json(e.message)
        console.log("Error at 'complete' controller in auth router: ", e.message)
    }
}

const completepage= async(req,res)=>{
    try{
        res.send("This is the complete page wehre you send the last details when signing up for site")
    }catch(e){
        res.status.json("Error in loading page")
        console.log("Error at 'complete' controller in auth router: ", e.message)
    }
}

const authentic = async(req,res)=>{
    try{
        passport.authenticate("instagram", { scope: ["user_profile"] })
        res.status(200).send("The instagram 0Auth stage 1 is a success!")
    
    }catch(e){
        res.status(401).json(e.message)
        console.log("Error at the controller 'authentic' in router 'auth': ", e.message)
    }
}

const rediretsuccess = async(req,res)=>{
    try{
        res.status(200).json("Welcome to the page after redirection, to see of you are logging in or signing up")
    }catch(e){
        console.log("Error at controller 'redirectsuccess; in router 'auth': ", e.message)
        res.status(500).json("Error loading the page: ",e.message)
    }
}

const authorize = async(req,res)=>{
    try{
        if(!req.user){
            throw new Error("This user does not exist, something went wrong with registration with your instagram user!")
        }

        if(req.authInfo.newUser){
            res.redirect("/completepage")
        }

        res.status(200).json("WELL DONE LOGIN SUCCESS", req.user, "!!DEBUG PURPOSES!!")

        

    }catch(e){
        res.status(401).json(e.message)
        console.log("Error at controller 'authorize' in router 'auth': ", e.message)
    }
}

const deleteuser = async(req,res)=>{
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: "Instagram ID is required" });
        }


        const result = await User.deleteOne({ username });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User data deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deletepage =async(req,res)=>{
    try{
        res.status(200).json({
            "Message":"To delete your user data please send a POST request to https://sotalove.up.railway.app/auth/deleteuser with the reust body containnig a 'username' property which holds the username your instagram username you signed up with.Thanks!",
            "URL":"https://sotalove.up.railway.app/auth/deleteuser",
            "contact":"diginalrogue@gmail.com"
        })
    }catch(e){
        console.log("Error at 'deletepage' controller in router 'auth': ",e.message)
        res.status(500).json("Issue loading up page!")
    }
}


module.exports={signup,login,complete,authentic,authorize,completepage,rediretsuccess,deleteuser,deletepage}