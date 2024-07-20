import {createSlice,current} from "@reduxjs/toolkit"



const userSlice= createSlice({
    name:"user",
    initialState:{
        userName:"",
        profilepic:"",
        email:"",
        Id:""
    },reducers:{
        login(state,action){
            state.userName=action.payload.username
            state.profilepic=action.payload.profile
            state.email=action.payload.email
            state.Id=action.payload.Id
            console.log(current(state))
        },
        logout(state,action){
            state.userName=""
            state.email=""
            state.profilepic=""
        }
    }
    
});
export const {login,logout}=userSlice.actions 

export default userSlice.reducer