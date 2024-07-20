import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

export default function BottomNavigation() {
    // initiliaze the navigator

    const navigate= useNavigate()

    // now manage the navigate handleer
   const  handleHomClick=()=>{
        navigate("/Chats")
    }
   const  handleConnectionClick=()=>{
        navigate("/Connections")
    }
    const handleProfileClick=()=>{
        navigate("/Chats")
    }

  return (
    <div>
        <div class="fixed mt-10 bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        <button type="button" onClick={handleHomClick}   class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <FaHome />
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
        </button>
        <button type="button"  onClick={handleConnectionClick} class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <FaUserFriends />
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Connections</span>
            
        </button>
       
        <button type="button"  onClick={handleProfileClick} class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <CgProfile />
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
        </button>
    </div>
</div>
    </div>
  )
}
