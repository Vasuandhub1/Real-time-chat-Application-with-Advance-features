import React, { useState } from 'react'
import { useSelector } from 'react-redux'


export default function MessageBox(props) {
   const chatId=useSelector((state)=>state.user.Id)
  
    const [person,setPerson]=useState(false)
  return (
    <div className='p-8'>
        {props.id===chatId?<div class="flex items-start justify-end max-w-50 gap-2.5">
   <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-blue-500 bg-green-300 rounded-br-xl rounded-tl-xl rounded-es-xl dark:bg-gray-700">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-gray-900 dark:text-white">{props.name}</span>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{props.time}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{props.message}</p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
   <img class="w-8 h-8 rounded-full" src={props.pic} alt="Jese image"/>
   
  
</div>:<div class="flex items-start  gap-2.5 max-w-50">
   <img class="w-8 h-8 rounded-full" src={props.pic} alt="Jese image"/>
   <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-gray-900 dark:text-white">{props.name}</span>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{props.time}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{props.message}</p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
   
  
</div>}
    </div>
  )
}
