const Message = require("../models/message")
const chatModel=require("../models/chatModel")
const UserModel= require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.SendMessage=async(req,res)=>{
    try{
        // take the data from the req body
        const {chatId,message}=req.body

        const {token}=req.cookies

        if(message===""){
            return res.status(404).send("Please type the message")
        }

        // now parse the toek 
        const TokenData=jwt.decode(token)

        // now check for the chat if chat is available 
        const isChat=await chatModel.findById(chatId)
        if(isChat){

            // now create the message
           const newMessage= await Message.create({sender:TokenData.id,content:message,chat:chatId})
           
        //    now update the lates message 
        // 

           const isMessage=await Message.findById(newMessage._id)
           .populate("sender","name pic email Username")
           .populate("chat")

               

            return res.status(200).send({data:isMessage}) 
            
        }else{
            return res.status(404).send("Message not Deliverd")
        }

    }catch(err){
        return  res.status(404).send(err.message)
    }
}

exports.accessChats=async(req,res)=>{
    try{
        // now take the chat id using the 
        const chatId=req.query.chatId

        // now find the message of the chat ids

        const messages=await Message.find({chat:chatId})
        .populate("sender","name pic email Username")
        .populate("chat")
       return res.send(messages)

    }catch(err){
        return res.status(404).send(err.message)
    }
}

