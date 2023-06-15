import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItem:[]
}


export const cartSlice=createSlice({
    name:'cartslice',
    initialState,
    reducers:{
        setCartItem(state,action){
            state.cartItem.push(action.payload)
        }
    }
})

export const {setCartItem} =cartSlice.actions
export  default cartSlice.reducer