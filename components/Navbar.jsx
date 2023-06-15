import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch, setSearchParam } from '../redux/slices/navbarSlice';

export default function Navbar() {
  const {isSearch}=useSelector(state=>state.navbarReducer)
  const {cartItem}=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  return (
    <View className='bg-blue-400  flex flex-row justify-between h-10 p-1 items-center'>
    {/* <View></View> */}
    <TouchableOpacity onPress={()=>console.warn('menu open')}>
    <Icon name="menu" size={20} color="white" ></Icon>
    </TouchableOpacity>
    
    <View>
    {isSearch?
    <View className='flex-row items-center  bg-white rounded-md cursor-pointer'>
   <TextInput onChangeText={(nativeEvent)=>dispatch(setSearchParam(nativeEvent))} className=' w-28  p-1'></TextInput>
   <TouchableOpacity onPress={()=>{
    dispatch(setIsSearch(false))
    dispatch(setSearchParam(''))
    }}>
   <Icon2 name='x' size={20} color={'black'}/></TouchableOpacity>
   </View>:
    <Text className='text-white'>Ecommerce app</Text>}
    </View>
    <TouchableOpacity onPress={()=>console.warn('menu open')} className='flex-row relative cursor-pointer'>
    <Icon name="shopping-cart" size={20} color="white" ></Icon>
   {cartItem.length>0 && <Text className='h-4 w-4 bg-white rounded-full text-center font-semibold absolute -translate-y-2'>{cartItem.length}</Text>}
    </TouchableOpacity>
    </View>
  )
}