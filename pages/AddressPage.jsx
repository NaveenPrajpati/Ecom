import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';


export default function AddressPage({navigation}) {
  const[userdata,setUserdata]=useState({})
  const[add,setAdd]=useState([])
  const[viewAdd,setViewAdd]=useState(false)
  const[text,setText]=useState([])
  const dispatch=useDispatch()
    useEffect(()=>{
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }

      setUserdata(getData)

     async function addAddress(){
     
      }

      addAddress()
    },[])


    function handleAddress(){
      firestore()
      .collection('Users')
      .doc(userdata.email)
      .update({
        address:'a'
      })
      .then(() => {
        console.log('User updated!');
      });
      
    }

  return (
    <View>
      <Text>Select Address</Text>
      <View>
      <FlatList
        data={userdata.address}
        renderItem={({item,index})=>(
          <TouchableOpacity key={index} className='border rounded-md'>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      /></View>

      {viewAdd && <View className='p-1'>

      <TextInput onChangeText={(text)=>setText(text)} className='w-full p-1 rounded-md'></TextInput>
      <TouchableOpacity onPress={()=>handleAddress()}>
        <Text>add address</Text>
      </TouchableOpacity>

      </View>}
    
   {!viewAdd &&  <TouchableOpacity onPress={setViewAdd(true)}>
      <Text>add Address</Text>
    </TouchableOpacity>}


    <TouchableOpacity onPress={navigation.navigate('Checkout')}>
      <Text>go to checkout</Text>
    </TouchableOpacity>
    </View>
  )
}