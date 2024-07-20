const express=require("express")
const route=express.Router()

const {createUser,signIn,allusers}= require("../controllers/userController")
const {auth_middleware}= require("../middleware/authentication_Middleware")

route.post("/createuser",createUser)//used 
route.post("/signIn",signIn)//used
route.get("/alluser",auth_middleware,allusers)//used



module.exports=route