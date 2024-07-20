const express =require("express")

const route=express.Router()

const {accessChat,fetchchats,createGroupChat,renameGroup,addMembers}= require("../controllers/chatControllers")
const {auth_middleware}=require("../middleware/authentication_Middleware")
const {SendMessage,accessChats}=require("../controllers/messages")
// access chat route
route.post("/accesschat",auth_middleware,accessChat)                
// fetch chats routes        //this handeler is used
route.get("/fetchchats",auth_middleware,fetchchats)       //this handeler is used
// group chat routes       //this handeler is used
route.post("/createGroup",auth_middleware,createGroupChat)       
// rename group       //this handeler is used
route.put("/renameGroup",auth_middleware,renameGroup)       
// Add new Members       //this handeler is used
route.put("/addUsers",auth_middleware,addMembers)       
// send message route       //this handeler is used
route.post("/Sendmessage",auth_middleware,SendMessage)       //this handeler is used
// access messages       //this handeler is used
route.get("/Acessmessage",auth_middleware,accessChats)       //this handeler is used

// expost rouets
module.exports=route