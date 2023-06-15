import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from './slices/navbarSlice'
import cartReducer from './slices/cartSlice'

export const store=configureStore({
    reducer:{
        navbarReducer:navbarReducer,
        cartReducer:cartReducer
    }
})