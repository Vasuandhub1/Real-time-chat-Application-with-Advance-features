
import react,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../../redux/user_Slice/userSlice'


export default function Login() {
     // now create the instance of the Navlink
     const navigate=useNavigate()
     const dispatch=useDispatch()
     const [data,setData]=useState({
         Username:"",
         email:"",
         password:"",
     })
     
     // function to add the 
     const handeltext=(event)=>{
         if(event.target.name==="name"){
             setData((prev)=>({...prev,Username:event.target.value}))
         }
         if(event.target.name=="email"){
             setData((prev)=>({...prev,email:event.target.value}))
         }
         if(event.target.name==="password"){
             setData((prev)=>({...prev,password:event.target.value}))
         }
        
         if(event.target.name==="checkbox"){
             if(data.checkbox===false){
                 setData((prev)=>({...prev,checkbox:true}))
             }else{
                 setData((prev)=>({...prev,checkbox:false}))
             }
         }
     }
 
     // how create the function to handel the submt button
 
     const handleSubmit=async()=>{
         const createdUser=await axios.post("http://localhost:3000/app1/signIn",{...data},{withCredentials:true})
         if(createdUser){
            // now create payload
            const payload={
                profile:createdUser.data.pic,
                email:createdUser.data.email,
                username:createdUser.data.Username,
                Id:createdUser.data._id
            }  
             dispatch(login(payload))
             navigate("/Chats")
         } 
     }
  return (
    <div >
      <section class=' h-screen bg-center bg-no-repeat bg-cover bg-[url("https://i.pinimg.com/originals/78/19/8c/78198c2b4bcb132d74e7477a551a3720.jpg")]'>
  <div class="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div class="w-full  bg-[#000000d2] border-dashed border-s-green-300 border-y-blue-300 border-e-pink-300 border-2  rounded-3xl shadow dark:border  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                  Sign In 
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-white dark:text-white">Your email</label>
                      <input type="email" name="email" onChange={handeltext} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                      <input type="password" name="password" onChange={handeltext} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-white dark:text-white">Confirm password</label>
                      <input type="confirm-password" onChange={handeltext} name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" onChange={handeltext} type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" onClick={handleSubmit} class="w-full text-white bg-gradient-to-r from-green-400 via-blue-500 to-pink-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}
