import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserData } from '../redux/slices/userSlice';

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
    }
  };

  return (
    <View className='bg-gray-300'>


      <Text className='text-lg font-bold mb-4 text-white'>
        Login
      </Text>
      <TextInput
        className='border border-gray-500 rounded-md w-64  p-2 mb-2'
        placeholder="Email"
        onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
      ></TextInput>
      <TextInput
        className='border border-gray-500 rounded-md w-64 p-2 mb-4'
        placeholder="Password"
        onChangeText={(nativeEvent)=>setPassword(nativeEvent)}
      ></TextInput>
      
      <TextInput className='bg-slate-300 p-2 rounded-sm '
      
      ></TextInput>
      
      <Button title="Login" onPress={handleLogin}  />
      <View>
        <Text>not have account?</Text>
        <Button title='signup' onPress={()=>navigation.navigate('Signup')}></Button>
      </View>

     
    </View>
  )
}