import React, { useEffect, useState } from 'react'
import Header from '../../Components/header_componest/header'
import MessageBox from '../../Components/messagebox/messageBox'
import TextBox from '../../Components/textBox/textBox'
import { useSelector } from 'react-redux'
import io from "socket.io-client"
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function Messages() {

  // call the data from the useSelector hook
  const chatName=useSelector((state)=>state.chat.chatname)
const chatId=useSelector((state)=>state.chat.chatId)
const pic=useSelector((state)=>state.chat.profilePic)
const users=useSelector((state)=>state.chat.users)
const user=useSelector((state)=>state.user.Id)
const navigate= useNavigate()



// state to manage the messages
const [message,setMessages]=useState([])
const [socketConnectd,SetScoket]=useState(false)
const [text,Settext]=useState("")

// handle the text field
const handletextField=(e)=>{
       
  Settext(e.target.value)
}


// create the endpoint 
const ENDPOINT="http://localhost:3100"


var socket

// join the chat id room


// handle use effect
useEffect(()=>{
  // join to the chat room using the chat id
  socket=io(ENDPOINT,{autoConnect:false})
  socket.connect()
  socket.emit("join_room",chatId)
  
},[])

// relode the previous chats from database
useEffect(()=>{
  messages()
},[])



// handle send button 
const handleSend=async()=>{
  const payload={
      message:text,
      chatId:chatId
  }
 const isDeliverd= await axios.post("http://localhost:3000/api/chat/Sendmessage",{...payload},{withCredentials:true})
 const chat=isDeliverd.data.data
 socket=io(ENDPOINT,{autoConnect:false})
 socket.connect()
 socket.emit("send_message",chat)
 Settext("")
}




// handle chats real time 

const messages=async()=>{

  const data=await axios.get(`http://localhost:3000/api/chat/Acessmessage?chatId=${chatId}`,{withCredentials:true})
  setMessages([...data.data])
  
}

// realtime accept message from socket.io
useEffect(()=>{
  socket.on("recivedMessage",(chat)=>{
    setMessages((prev)=>[...prev,chat])
    console.log(chat)
  })
},[socket])

// now handel the back handler 

const backbutton=()=>{
  navigate("/Chats")
}




  return (
    <div>
      <Header back={backbutton}></Header>
      <div className='pt-[4rem] bg-cover w-screen min-h-screen max-h-full bg-fixed bg-no-repeat bg-[url("https://images.prismic.io/tdsrcstaff/12678ff6-8732-442e-a5cb-29a5b104d6c7_TDwallpaper7.jpg?auto=compress,format")]'>
      {message?.map((elem,index)=>{
        let time=elem.createdAt.substr(2,8)
        return(
          <MessageBox message={elem.content} pic={elem.sender.pic} id={elem.sender._id} name={elem.sender.Username} time={time} ></MessageBox>
        )
      })}
      <div className='relative'>
      <TextBox inputbox={handletextField} text={text} button={handleSend} ></TextBox>
      </div>
</div>

    </div>

  )
}
