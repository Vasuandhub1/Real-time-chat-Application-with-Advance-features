import { useState } from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import SignUp from './Components/signUp_component/signUp'
import Chats from './Components/Bottom_Navigation/bottomNavigation'
import AllChats from './pages/chatpage/allChats'
import Header from './Components/header_componest/header'
import Login from './Components/login_component/logIn'
import Messages from './pages/messages/messages'
import Connections from './pages/connections/connections'
import { useSelector } from 'react-redux'



function App() {
  // take the logined user data
  const auth=useSelector((state)=>state.user.userName)
  return (
    <>
    <BrowserRouter>
    {auth?<Routes>
      <Route path='/Chats' element={<AllChats></AllChats>}></Route>
      <Route path='/Messages' element={<Messages></Messages>}></Route>
      <Route path='/Connections' element={<Connections></Connections>}></Route>
      <Route path='/signIn' element={<Login></Login>}></Route>
    </Routes>:<Routes>
      <Route path='/' element={<SignUp></SignUp>}></Route>
      <Route path='/signIn' element={<Login></Login>}></Route>
    </Routes>}
    
    </BrowserRouter>
    </>
  )
}

export default App
