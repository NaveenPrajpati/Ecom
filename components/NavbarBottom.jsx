import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon  from 'react-native-vector-icons/Entypo'
import Icon2  from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch, setdrawer } from '../redux/slices/navbarSlice'
import * as RootNavigation from '../navigation/RootNavigation';
import { drawer } from '../pages/HomePage'
import { useMyRef } from '../redux/slices/cartSlice'


export default function NavbarBottom() {
  const {isSearch}=useSelector(state=>state.navbarReducer)
  const dispatch=useDispatch()

  return (
    <View className='flex-row justify-between px-2 py-1 bg-gray-400 h-8'>
      <TouchableOpacity onPress={()=>RootNavigation.navigate('Home')}>
      <Icon name='home'  size={20} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(setdrawer(true))}>
      <Icon name='heart-outlined'  size={20}  color={'white'}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch(setIsSearch(!isSearch))}>
      <Icon2 name='search'  size={20}  color={'white'}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>RootNavigation.navigate('Login')}>
      <Icon2 name='user'  size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  )
}