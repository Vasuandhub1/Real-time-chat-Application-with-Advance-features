import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./user_Slice/userSlice"
import storage from "redux-persist/lib/storage"
import {persistStore,persistReducer} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import chatSlice from "./chat_slice/chatSlice"



const persistConfig={
    key:"root",
    storage
}

const combine=combineReducers({
    user:userReducer,
    chat:chatSlice
})

const persistedReducer= persistReducer(persistConfig,combine)

export const store= configureStore({reducer:persistedReducer})

export const persistor=persistStore(store)

 
