import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';

export default function Signup() {

  const[username,setUserName]=useState('')
  const[role,setRole]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
    function handleChange(){

    }
    const handleSignup = () => {
        firestore()
  .collection('Users')
  .add({
    name: username,
    email:email,
    role:role,
    password:password
  })
  .then(() => {
    console.log('User added!');
  });
      };

  return (
    <View className='flex-1 justify-center items-center p-4'>
    <Text className='text-2xl font-bold mb-4'>Signup</Text>
    <TextInput
      className='border border-gray-500 rounded-md w-64 p-2 mb-2'
      placeholder="Name"
      onChangeText={(nativeEvent)=>setUserName(nativeEvent)}
    />
    <TextInput
      className='border border-gray-500 rounded-md w-64 p-2 mb-2'
      placeholder="Email"
      keyboardType="email-address"
      onChangeText={(nativeEvent)=>setEmail(nativeEvent)}
    />
    <TextInput
      className='border border-gray-500 rounded-md w-64 p-2 mb-2'
      placeholder="Role"
      onChangeText={(nativeEvent)=>setRole(nativeEvent)}
    />
    <TextInput
      className='border border-gray-500 rounded-md w-64 p-2 mb-2'
      placeholder="Password"
      secureTextEntry
      onChangeText={(nativeEvent)=>setPassword(nativeEvent)}
      
    />
    <TextInput
      className='border border-gray-500 rounded-md w-64 p-2 mb-4'
      placeholder="Confirm Password"
      secureTextEntry
    />
    <Button title="Signup" onPress={handleSignup} />
  </View>
  )
}