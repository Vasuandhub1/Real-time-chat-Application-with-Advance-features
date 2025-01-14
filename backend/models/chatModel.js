const mongoose= require("mongoose")

const chatModel= new mongoose.Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:String,
        ref:"userModel"
    }
},{timestamps:true})

module.exports=mongoose.model("chatModel",chatModel)