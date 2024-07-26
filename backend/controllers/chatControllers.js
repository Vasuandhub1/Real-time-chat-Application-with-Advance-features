const chatModel = require("../models/chatModel")
const jwt= require("jsonwebtoken")
const userModel = require("../models/userModel")

// this handler is use to connec the two users
exports.accessChat=async(req,res)=>{
    try{
        // now take the uer id from the  req body
        const {userId}=req.body

        // now check for  the user id
        if(!userId){
            return res.status(404).json({
                sucess:false,
                message:"user id not found"
            })
        }

        const {token}=req.cookies
        

        const user=jwt.decode(token)

        // now check if user and requester are not same

        if(user.id===userId){
            return res.send("you can not have chat with your self")
        }

        let isChat= await chatModel.find({
            isGroupChat:false,
            $and:[
                {users:{$elemMatch:{$eq:user.id}}},
                {users:{$elemMatch:{$eq:userId}}}
                
            ]
        }).populate("users","-password").populate("latestMessage")

        isChat=await userModel.populate(isChat,{
            path:"latestmessage.sender",
            select:"name pic email"
        })

        if(isChat.length>0){
           return res.send(isChat[0])
        }else{
            var chatData={
                chatName:"sender",
                isGroupChat:false,
                users:[user.id,userId],
                
            };
            try{
                const createdChat=await chatModel.create(chatData)

                const FullChat= await chatModel.findOne({_id:createdChat._id}).populate("users","-password")
               return  res.status(200).send(FullChat)
            }catch(err){
                return res.status(400).send(err.message)
            }
        }

    }catch(err){
        return res.status(404).json({
            sucess:false,
            message:err.message
        })
    }
}

// fecch the chat user is loged in

exports.fetchchats=async(req,res)=>{
try{
    // now find all the chats in which the login user is present 
    const {token}=req.cookies
    const user=jwt.decode(token)

    const chats= await chatModel.find({users:{$elemMatch:{$eq: user.id}}})
    .populate("users","-password")
    .populate("latestMessage")
    .populate("groupAdmin","-password")
    .sort({updatesAt:-1})
    
    return res.status(200).json({
        sucess:true,
        chats
    })
}catch(err){
    return res.status(404).json({
        message:err.message
    })
}
}

exports.createGroupChat=async(req,res)=>{
    try{
        // take the multiple user from the body in for  of the array
        const {members}=req.body
        const {groupName}=req.body

        // now take the Admin details
        const {token}= req.cookies

        // now decode the token
        const user=jwt.decode(token) 

        if(members&&groupName){
            // now using group name and group member create group
            const createGroup=await chatModel.create({chatName:groupName,isGroupChat:true,users:[...members],groupAdmin:user.id})
            
            const isCreated=await chatModel.findById(createGroup._id)
            .populate("users","-password")
            .populate("groupAdmin","-password")

            return res.status(200).json({
                sucess:true,
                isCreated
            })

        }
    }catch(err){
        return res.status(200).json({
            sucess:false,
            message:err.message
        })
    }
}

exports.renameGroup=async(req,res)=>{
    try{
        // now take the chat id from the user and update the group name
        const {GroupId,newName}= req.body
        // now find the groud id an dupda teh user id
        const isGroup=await chatModel.findByIdAndUpdate(GroupId,{chatName:newName})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        // now send the new named data from the 
        res.status(200).send({
            isGroup
        })
    }catch(err){
        return res.status(200)
        .send({"message":err.message})
    }
}
exports.addMembers=async(req,res)=>{
    try{
        // now take the memners array from the admin
        const {newMembers,GroupId}=req.body
        // now update the new users
        const isupdated=await chatModel.findByIdAndUpdate(GroupId,{$push:{users:{...newMembers}}})

        return res.status(200).send({
            message:"members Added sucessful"
        })

    }catch(err){
        return res.status(404).send({message:err.message})
    }
}