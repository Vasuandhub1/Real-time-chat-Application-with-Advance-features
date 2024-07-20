const mongoose=require("mongoose")


const userModel=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requred:true
    },
    email:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{timestamps:true})

module.exports= mongoose.model("userModel",userModel)