import React,{useEffect, useState} from 'react'
import BottomNavigation from '../../Components/Bottom_Navigation/bottomNavigation'
import axios from 'axios'
import ChatHeader from '../../Components/Chat_page_header/chatHeader'
import _debounce from 'lodash/debounce';


export default function Connections() {
  // call the state hook
  const [search,SetSearch]=useState("")
  const [data,Setdata]=useState([])


  // handle the search
  const handelsearch=(event)=>{
    SetSearch(event.target.value)
}
// handle fetch api
const handeldata=async()=>{
  const isData=await axios.get(`http://localhost:3000/app1/alluser?search=${search?search:null}`,{withCredentials:true})
  Setdata(isData.data.data)
}

// now handle the add user to connect to the new user
const handleAdduser=async(index)=>{
  const userID=data[index]._id
  // now we have to add the user to the chat 
  const connected=await axios.post("http://localhost:3000/api/chat/accessChat",{userId:userID},{withCredentials:true})
  console.log("connectionos",connected)
}



// now handle the useEffect
useEffect(()=>{
  handeldata()
},[search])
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
        <input type="search" onChange={handelsearch} value={search} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="button" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</div>
        </div>
        {data.length>0?<div class="relative h-screen pb-16 mb-50 m-3 lg:max-w-sm sm:w-full overflow-y-auto bg-opacity-5  bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 ">
     <ul className=' '>
    {data?.map((elem,index)=>{
      return(
        <li key={index} onClick={()=>handleAdduser(index)} class="border-b border:gray-100 dark:border-gray-600 my-2">
                    <a href="#" class="flex items-center justify-start bg-white w-full px-4 py-3 hover:bg-slate-300">
                        <img class="me-3 rounded-full w-11 h-11" src="https://th.bing.com/th/id/OIP.w5GGXqNNN5RKuwzfVoKklgHaHa?w=522&h=522&rs=1&pid=ImgDetMain" alt="Jese Leos Avatar"/>
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">{elem.Username}</span> : "Hey, what's up?"</p>
                            <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
                        </div>
                    </a>
                </li>
      )
    })}
    </ul> 
    </div>:<div class="relative h-screen pb-16 mb-50 mt-1   lg:max-w-sm sm:w-full  bg-opacity-5  bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 ">
     
    </div>}
    <BottomNavigation></BottomNavigation>
    </div>
  )
}
