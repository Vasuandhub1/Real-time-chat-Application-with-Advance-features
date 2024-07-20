const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const userModel= require("../models/userModel")

// now in this middle ware we have to check if we have the valid json web token

exports.auth_middleware=(async(req,res,next)=>{
    try{
        const {token}=req.cookies
    
        const user=jwt.decode(token);

        // now check if the token credentials are valid

        const isUser=await userModel.findById(user.id);

      
       
        if(isUser){
            next()
        }else{
            return res.status(404).json({
                sucess:false,
                message:"The token details does not match"
            })
        }
    
    }catch(err){
       return res.status(404).json({
        sucess:false,
        message:err.message
        })
    }
    })