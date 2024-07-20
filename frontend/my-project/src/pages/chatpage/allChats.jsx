import React, { useEffect, useState } from 'react'
import BottomNavigation from '../../Components/Bottom_Navigation/bottomNavigation'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setChats } from '../../../redux/chat_slice/chatSlice'
import ChatHeader from '../../Components/Chat_page_header/chatHeader'


export default function AllChats() {
    const [chats,setChat]=useState([])
    const [search,SetSearch]=useState("")
    const navigate= useNavigate()
    const dispatch=useDispatch()
    // now take the logined user data
    const logedInUserId=useSelector((state)=>state.user.Id)
    
    
    const accessChats=async()=>{
        const accesschat=await axios.get("http://localhost:3000/api/chat/fetchchats",{withCredentials:true})
        console.log(accesschat)
        setChat([...accesschat.data.chats])
        
    }

    // now handel it using use effect 
    useEffect(()=>{
        accessChats()
        
    },[])

    // now handler to implement the search user 
    const handelsearch=(event)=>{
        SetSearch(event.target.value)
    }
    

    // now write the handler to route to the message

    const goToMessag=(chatId,chatname,pic="https://th.bing.com/th/id/OIP.w5GGXqNNN5RKuwzfVoKklgHaHa?w=522&h=522&rs=1&pid=ImgDetMain")=>{
        let payload={
            chatname:chatname,
            chatId:chatId,
            profilePic:pic,
            users:[...chats]
        }
       dispatch(setChats(payload))
        console.log("clicked",payload)
        navigate("/Messages")
        
       
        
        

    }

  return (
    <div className=" bg-fixed bg-[url('https://th.bing.com/th/id/OIP.PlQD3QT0iAbF-ELVE7nL2wAAAA?rs=1&pid=ImgDetMain')]">
        <ChatHeader></ChatHeader>
        <div className='mx-4 my-2 relative top-1'>       
<div class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={handelsearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="button" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</div>
        </div>
      <div class="relative h-screen pb-16 mb-50 mt-1  lg:max-w-sm sm:w-full bg-opacity-5 overflow-y-scroll border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 ">
    <ul className=''>
       {chats?.map((elem,index)=>{
            if(elem.isGroupChat===true ){
                if(search===""){
                    const chatname=elem.chatName
                return(<li key={index} onClick={()=>goToMessag(elem._id,chatname)} class="border-b border:gray-100 dark:border-gray-600 my-2">
                    <a href="#" class="flex items-center justify-start w-full px-4 py-3 bg-white hover:bg-gray-200 dark:hover:bg-gray-800">
                        <img class="me-3 rounded-full w-11 h-11" src="https://th.bing.com/th/id/OIP.w5GGXqNNN5RKuwzfVoKklgHaHa?w=522&h=522&rs=1&pid=ImgDetMain" alt="Jese Leos Avatar"/>
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{chatname}</span>: "Hey, what's up? All set for the presentation?"</p>
                            <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                        </div>
                    </a>
                </li>)
                }else{
                    const chatname=elem.chatName
                    if(chatname.includes(search)){
                        // const chatname=elem.chatName
                return(<li key={index} onClick={()=>goToMessag(elem._id,chatname)}  class="border-b border:gray-100 dark:border-gray-600 my-2">
                    <a href="#" class="flex items-center justify-start w-full px-4 py-3 bg-white hover:bg-gray-200 dark:hover:bg-gray-800">
                        <img class="me-3 rounded-full w-11 h-11" src="https://th.bing.com/th/id/OIP.w5GGXqNNN5RKuwzfVoKklgHaHa?w=522&h=522&rs=1&pid=ImgDetMain" alt="Jese Leos Avatar"/>
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{chatname}</span>: "Hey, what's up? All set for the presentation?"</p>
                            <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                        </div>
                    </a>
                </li>)
                    }
                }
            }else{
                // stringy fy the array
                let chat_users0=JSON.stringify(elem.users[0])
                let chat_users1=JSON.stringify(elem.users[1])
                chat_users0=JSON.parse(chat_users0)
                chat_users1=JSON.parse(chat_users1)
                if(chat_users0._id!=logedInUserId){
                  if(search===""){
                    const chatname=chat_users0.Username
                    console.log(chatname)
                    return (<li key={index} onClick={()=>goToMessag(elem._id,chatname,chat_users0.pic)}  class="border-b border:gray-100 dark:border-gray-600 my-2">
                        <a href="#" class="flex items-center justify-start w-full px-4 py-3  bg-white hover:bg-gray-200 dark:hover:bg-gray-800">
                            <img class="me-3 rounded-full w-11 h-11" src={chat_users0.pic} alt="Jese Leos Avatar"/>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{chatname}</span>: "Hey, what's up? All set for the presentation?"</p>
                                <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                            </div>
                        </a>
                    </li>)
                  }
                  else{
                    const chatname=chat_users0.Username
                    if(chatname.includes(search)){
                        return (<li key={index} onClick={()=>goToMessag(elem._id,chatname,chat_users0.pic)}  class="border-b border:gray-100 dark:border-gray-600 my-2">
                            <a href="#" class="flex items-center justify-start w-full px-4 py-3  bg-white hover:bg-gray-200 dark:hover:bg-gray-800">
                                <img class="me-3 rounded-full w-11 h-11" src={chat_users0.pic} alt="Jese Leos Avatar"/>
                                <div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{chatname}</span>: "Hey, what's up? All set for the presentation?"</p>
                                    <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                                </div>
                            </a>
                        </li>)
                    }
                  }
                }if(chat_users1._id!=logedInUserId){
                    const chatname=chat_users1.Username
                   
                    if(chatname.includes(search)){
                        return (<li key={index} onClick={()=>goToMessag(elem._id,chatname,chat_users1.pic)}  class="border-b border:gray-100 dark:border-gray-600 my-2">
                            <a href="#" class="flex items-center justify-start w-full px-4 py-3  bg-white hover:bg-gray-200 dark:hover:bg-gray-800">
                                <img class="me-3 rounded-full w-[40px] h-[40px]" src={chat_users1.pic} alt="Jese Leos Avatar"/>
                                <div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white block">{chatname}</span>: "Hey, what's up? All set for the presentation?"</p>
                                    <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                                </div>
                            </a>
                        </li>)
                    }else if(search===""){
                        return (<li key={index} onClick={()=>goToMessag(elem._id,chatname,chat_users1.pic)}  class="border-b border:gray-100 dark:border-gray-600 my-2">
                            <a href="#" class="flex items-center justify-start w-full px-4 py-3  bg-white hover:bg-gray-200 dark:hover:bg-gray-800">
                                <img class="me-3 rounded-full w-[40px] h-[40px]" src={chat_users1.pic} alt="Jese Leos Avatar"/>
                                <div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white block">{chatname}</span>: "Hey, what's up? All set for the presentation?"</p>
                                    <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                                </div>
                            </a>
                        </li>)
                    }
                    
                }
                
            }
       })} 
    
    </ul>
    
</div>
<BottomNavigation></BottomNavigation>
    </div>
  )
}
