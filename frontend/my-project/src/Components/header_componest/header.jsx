import React from 'react'
import MessageBox from '../messagebox/messageBox'
import TextBox from '../textBox/textBox'
import { useSelector } from 'react-redux'
import { TiArrowBackOutline } from "react-icons/ti";
import Showprofilepic from '../ShowProfilePic/showprofilepic';

export default function Header(props) {
const chatName=useSelector((state)=>state.chat.chatname)
const chatId=useSelector((state)=>state.chat.chatId)
const pic=useSelector((state)=>state.chat.profilePic)
  return (
    <div >
<nav class="fixed w-screen border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <button data-collapse-toggle="navbar-hamburger" onClick={props.back} type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
      <span class="sr-only">back to home</span>
      <TiArrowBackOutline size={100} />
    </button>
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{chatName}</span>
        <img src={pic} className="me-3 rounded-full w-11 h-11" alt="Flowbite Logo" />
    </a>

  </div>
</nav>
    </div>
  )
}
