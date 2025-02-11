const express= require("express")
const dbConnect=require("./config/connectdatabase")
const app=express()
const { createServer } = require("http");
const { Server } = require("socket.io");
const route = require("./router/routers")
const chatroutes= require("./router/chatroute")
const cookieParser=require("cookie-parser")
const cors=require("cors");
const path=require("path")
const dotenv=require("dotenv").config()


//conncect to the database 
dbConnect.dbConnect()

// now handle the cors error
// create the cors payload
const paylod={
    "origin":true,
    "methods":"GET,PUT,POST,PATCH,DELETE",
   "credentials":true,
   "httpOnly":true,
   "Access-Control-Allow-Credentials": true
   
}
app.use(cors(paylod))
// body parser
app.use(express.json())
app.use(cookieParser())

// Deployment
const __dirname1=path.resolve()
if(process.env.NODE_ENV==="production"){

    app.use(express.static(path.join(__dirname1,"/frontend/build")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","dest","index.html"))
    })

}else{
    app.get("/",(req,res)=>{
        res.send("Api is running sucessfully")
    })

}

// routes
app.use("/app1",route)
app.use("/api/chat",chatroutes)

app.get("/s",(req,res)=>{
    res.send("hello")
})
const server=app.listen(process.env.PORT,()=>console.log(`server is live at the ${process.env.PORT}`))

// now initializating socket server on theexpress backend

const httpServer =new createServer(app);
const io = new Server(httpServer,
    
    {
    cors:{ 
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
   
});

    io.on("connection",(socket)=>{
    console.log("connected to socket.io",socket.id);

    // joinroom
    socket.on("join_room",(chatId)=>{
        socket.join(chatId)
        console.log(`connected to the room : ${chatId}`)
    })
    socket.off("join_room",()=>{
        console.log("leaved room")
        socket.leave()
        socket.removeListener()
        
    })

    // send message event
    socket.on("send_message",(chat)=>{
        console.log("the new message send is : ",chat)
        io.emit("recivedMessage",chat)
    })
    socket.off("send_message",(chat)=>{
        console.log("listener off",chat)
        socket.removeListener()
    })


    // to disconnect
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
        socket.removeAllListeners()
        socket.disconnect(true)
    })

    

})
httpServer.listen(3100);
