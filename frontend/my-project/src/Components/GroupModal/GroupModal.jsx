import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Badge from '../Badge/badge'
import axios from 'axios'

export default function GroupModal(props) {

    // take the data from useSelector
    const logineduser=useSelector((state)=>state.user.Id)

    // states requires 
    const [drowp,Setdrowp]=useState(false)
    const [grpname,Setgrpname]=useState("")
    const [selected,SetSelected]=useState([])   

    // function to handel drowp down 
    const handleDrowpdown=()=>{
        if(drowp===false){
            Setdrowp(true)
        }else{
            Setdrowp(false)
        }
    }

    // function to take the group name
    const handelgrpname=(event)=>{
        Setgrpname(event.target.value)
    }
    console.log("props",props.chats)
    console.log(logineduser)

    // function to handle the check box using states 
    const handlePreSelected=()=>{
        const temp=[...props.chats]
        temp.forEach((elem)=>{
            elem.selected=false
        })

        // now set selected
        SetSelected([...temp])
    }

    //function to handle the selected box
    const handlecheck=(index)=>{
        const temp=[...selected]
        if(selected[index].selected===false){
            temp[index].selected=true;
            SetSelected([...temp])
        }else{
            temp[index].selected=false;
            SetSelected([...temp])
        }
        
    } 

    // now create the function for handelng the api to create the group
    const handleCreateGroup=async()=>{
        let temp=[]
        selected.map((elem)=>{
            if(elem.isGroupChat===false && elem.selected===true){
                if(logineduser!=elem.users[0]._id){
                    temp=[...temp,elem.users[0]._id]
                }else{
                    temp=[...temp,elem.users[1]._id]
                }
            }
        })
        temp=[...temp,logineduser]
        const data= {
            groupName:grpname,
            members:temp
        }
        const isCreated=await axios.post("http://localhost:3000/api/chat/createGroup",{...data},{withCredentials:true})
        if(isCreated){
            alert("group created sucessfully")
            window.location.reload()
        }else{
            alert("err in creation")
        }
    }

    //handle useEffect 
    useEffect(()=>{
        handlePreSelected()
    },[])
    console.log("seected",selected)
  return (
    <div>
      
<div id="crud-modal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
       
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
           
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Group
                </h3>
                <button type="button" onClick={props.close} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            {/* input fields component */}
           
            <div class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Goup Name</label>
                        <input type="text" onChange={handelgrpname} value={grpname} name="Goup Name" id="Goup Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter group name" required=""/>
                    </div>
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Members</label>
                        <div className='w-[100%] flex flex-wrap h-auto min-h-4 p-2 rounded-lg bg-grey-50 border-2 ' >
                            {selected?.map((elem,index)=>{
                                if(elem.isGroupChat===false && elem.selected===true){
                                    let Username
                                    if(logineduser!=elem.users[0]._id){
                                        Username=elem.users[0].Username
                                    }else{
                                        Username=elem.users[1].Username
                                    }
                                    return (
                                        <div key={index}>
                                            <Badge user={Username} ></Badge>
                                            </div>
                                    )
                                }
                        })}
                        </div>
                    </div>
                </div>
                
<button id="dropdownUsersButton" onClick={handleDrowpdown} data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" class="text-white bg-blue-700 my-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Add members 

</button>

{/* user select drowp down */}

<div id="dropdownUsers" class="z-10  bg-white rounded-lg shadow w-60 dark:bg-gray-700">
  {drowp?<ul class="h-48  py-2 m-3 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
    
   {props.chats?.map((elem,index)=>{
    if(elem.isGroupChat===false){
        
       if(logineduser!=elem.users[0]._id){
        let userName=elem.users[0].Username
    return (
        <li key={index}  className='flex items-center p-2 m-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white '>
    <input onChange={()=>handlecheck(index)} id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <a href="#" class="flex items-center px-4 py-2 ">
        <img class="w-6 h-6 me-2 rounded-full" src={elem.users[0].pic} alt="Jese image"/>
        {userName}
      </a>
    </li>
    )
}else{
    let userName=elem.users[1].Username
    return (
        <li key={index} className='flex items-center  m-1 p-2  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
    <input id="default-checkbox" onChange={()=>handlecheck(index)}  type="checkbox" value=""  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <a href="#" class="flex items-center px-4 py-2">
        <img class="w-6 h-6 me-2 rounded-full" src={elem.users[1].pic} alt="Jese image"/>
        {userName}
      </a>
    </li>
    )

}
    }
   })}
  </ul>:null}

  {/* create button html */}
  
</div>

                <button type="button" onClick={handleCreateGroup}  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create Group
                </button>
            </div>
        </div>
    </div>
</div> 

    </div>
  )
}
