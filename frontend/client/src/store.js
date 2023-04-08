import {configureStore} from '@reduxjs/toolkit'
import userReducer  from './features/user';
import adminReducer from './features/admin';
 export const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
 })