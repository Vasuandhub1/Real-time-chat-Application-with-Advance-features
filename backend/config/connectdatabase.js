const mongoose=require("mongoose")
require("dotenv").config()

exports.dbConnect=async()=>{
    const connect=await mongoose.connect(`${process.env.DATA_BASE}`,{
        family:4
    })
    if(connect){
        console.log("connect to database sucess full")
    }else{
        console.log(connect)
    }

}