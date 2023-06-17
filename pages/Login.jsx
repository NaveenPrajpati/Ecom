import { View, Text, TextInput, Button, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserData } from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({navigation}) {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {isLogin}=useSelector(state=>state.userReducer)
  const dispatch=useDispatch()

  const handleLogin = async() => {
   
    const user = await firestore().collection('Users').where('email','==',email).get();
    console.log(user.docs[0]._data)
    let data=user.docs[0]._data
    
    if(password==data.password){
    console.log('login success')
    dispatch(setLogin(true))
    dispatch(setUserData(data))
    navigation.navigate.goBack()  

  const  setObjectValue = async (value) => {
      try {
        const jsonValue = JSON.stringify({
          name:data.username,
          email:data.email,
          address:data.address,
          role:data.role
        })
        await AsyncStorage.setItem('userData', jsonValue)
      } catch(e) {
        // save error
      }
    
      console.log('Done.')
    }
    setObjectValue

    }
  };

  return (
    <View className='border rounded-xl mt-20 mx-4 p-5'>


      <Text className='text-lg font-bold mb-4'>
        Login
      </Text>
      <TextInput
        className='border border-gray-500 rounded-md  p-2 mb-2 w-full'
        placeholder="Email"
        onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
      ></TextInput>
      <TextInput
        className='border border-gray-500 rounded-md w-full p-2 mb-4'
        placeholder="Password"
        onChangeText={(nativeEvent)=>setPassword(nativeEvent)}
      ></TextInput>
      
      <TextInput className=' p-2 rounded-sm '/>
      
      <TouchableOpacity onPress={handleLogin} className='bg-blue-500  p-1 rounded-md'>
      <Text className='text-white text-lg font-semibold'>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
      <Text className='text-blue-600 text-right'>not have account?</Text>
      </TouchableOpacity>
      <View> 
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} className='bg-blue-500  p-1 rounded-md'>
          <Text className='text-white text-lg font-semibold'>signup</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  )
}