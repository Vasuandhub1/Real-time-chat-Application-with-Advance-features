import React from 'react'
import { RiChatHeartLine } from "react-icons/ri";
import { MdOutlineGroups2 } from "react-icons/md";
import { useSelector } from 'react-redux';

export default function ChatHeader() {
    // now handle the useselector  to tak ethe use pic
    const pic=useSelector((state)=>state.user.profilepic)
  return (
    <div className="">
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <RiChatHeartLine size={30}/>
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Naina chats</span>
  </a>
  <div class="flex items-center md:order-2 space-x-10 md:space-x-10 rtl:space-x-reverse">
      
      <button type="button" class="flex text-sm\ rounded-full md:me-0 focus:ring-4" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <MdOutlineGroups2 size={30} />
      </button>

      <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src={pic}/>
      </button>
    
  </div>
  
  </div>
</nav>

    </div>
  )
}
