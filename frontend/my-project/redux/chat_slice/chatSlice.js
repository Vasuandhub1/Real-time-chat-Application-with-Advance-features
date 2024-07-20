import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice=createSlice({
    name:"chatSlice",
    initialState:{
        chatname:"",
        chatId:"",
        profilePic:"",
        users:[]
    },
    reducers:{
        setChats(state,action){
            state.chatname=action.payload.chatname,
            state.chatId=action.payload.chatId,
            state.profilePic=action.payload.profilePic
            state.users=[...action.payload.users]
            console.log(state)
        }
    }
})
export const {setChats} = ChatSlice.actions

export default  ChatSlice.reducer