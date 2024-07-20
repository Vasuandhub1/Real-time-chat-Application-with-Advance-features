const mongoose=require("mongoose")

exports.dbConnect=async()=>{
    const connect=await mongoose.connect("mongodb://localhost:27017/chat_app",{
        family:4
    })
    if(connect){
        console.log("connect to database sucess full")
    }else{
        console.log(connect)
    }

}