import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

const initialState={
    cartItem:[],
    wishItem:[],
    checkoutData:[]
}


export const cartSlice=createSlice({
    name:'cartslice',
    initialState,
    reducers:{
        setCartItem(state,action){
            state.cartItem.push(action.payload)
        },
        removeCartItem(state,action){
            const newArr=state.cartItem.filter((item)=>item.id!=action.payload)
            state.cartItem=newArr
        },
        setWishItem(state,action){
            state.wishItem.push(action.payload)
        },
        setCheckOutData(state,action){
            state.checkoutData=action.payload
        }
    }
})

export const useMyRef = () => {
    const ref = useRef(null);
  
    // Additional logic using the ref can be added here
  
    return ref;
  };

export const {setCartItem,removeCartItem,setWishItem,setCheckOutData} =cartSlice.actions
export default cartSlice.reducer