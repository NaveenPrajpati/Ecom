import { createSlice } from "@reduxjs/toolkit";
let initialState={
    isSearch:false,
    searchParam:''

}

export const navbarSlice=createSlice({
name:'navSlice',
initialState,
reducers:{
    setIsSearch(state,action){
        state.isSearch=action.payload
    },
    setSearchParam(state,action){
        state.searchParam=action.payload
    },
}

})
export const {setIsSearch,setSearchParam} =navbarSlice.actions
export default navbarSlice.reducer