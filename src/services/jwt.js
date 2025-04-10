const jwt= require("jsonwebtoken")
require("dotenv").config()


const sign = async(n)=>{
    const accesstoken = jwt.sign({userId:n._id,username:n.username},process.env.KEY, {expiresIn:'30d'})
    if(!accesstoken){
        throw new Error("Issue signing in token")
    }
    return accesstoken;
}

module.exports={sign};
