const userModel = require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


exports.createUser=async(req,res)=>{
    try{
        // call the data frm the req body

        const {email,password,Username}=req.body

        // now check if the email is uniqus
        const isavailable=await userModel.findOne({email:email})

        // if the email is available
        if(!isavailable){
            // now encrypt the password
            await bcrypt.hash(password,10)
            .then(async(encrypted)=>{
                await userModel.create({Username:Username,password:encrypted,email})
                return res.status(200).json({
                    sucess:true,
                    message:"sucessfully created the user"
                })

            }).catch((err)=>{
                return res.status(404).json({
                    sucess:false,
                    message:err.message
                }) 
            })
        }

    }catch(err){
        return res.status(404).jons({
            sucess:false,
            message:err.message
        })
    }
}
//  handle the logi
exports.signIn=async(req,res)=>{
    try{
        // now take the data from the req body
        const {email,password}=req.body

        // check for the valid email id

        const isUser=await userModel.findOne({email:email})

        // if email is present 
        
        if(isUser){
            // now we have to check the passward and generate the token
            const isCorrect=await bcrypt.compare(password,isUser.password)
            if(isCorrect){
                const payload={
                    "username":isUser.Username,
                    "id":isUser._id
                }
                const token= jwt.sign(payload,"vasu",{expiresIn:"2h"})
                isUser.password=""

                res.cookie("token",token,{expiresIn:"2h"})

                return res.status(200).send(isUser)
            } 
            else{
                return res.status(404).json({
                    sucess:false,
                    message:"plz check the password"
                })
            }
        }else{
            return res.status(404).json({
                sucess:false,
                message:"Email Id not found plz Register first"
            })
        }

    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}

// api/user ?search=vasu

exports.allusers=async(req,res)=>{
    try{
        const keyword=req.query.search
        const {token}=req.cookies

        const user=jwt.decode(token)
       
        let users= await userModel.find({$or:([{Username:{$regex: keyword , $options:"i"}},{email:{$regex: keyword , $options:"i"}}])})
        
        // now nullify the password
        users.forEach((elem)=>{
            elem.password=""
        })


        return res.status(200).json({
            sucess:true,
            message:"sucessfuly searched",
            data:users
        })
        
    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}
