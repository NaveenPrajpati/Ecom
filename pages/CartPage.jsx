import { View, Text, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem } from '../redux/slices/cartSlice'
import WarningModal from '../components/WarningModal'
import * as RootNavigation from '../navigation/RootNavigation';


export default function CartPage({navigation}) {
  const[warning,setWarning]=useState(false)
    const {cartItem}=useSelector(state=>state.cartReducer)
    const dispatch=useDispatch()
    const {isLogin}=useSelector(state=>state.userReducer)

const[totalPrice,setTotalPrice]=useState(0)

useEffect(()=>{
    for(let i=0;i<cartItem.length;i++){
        console.log(cartItem[i].price)
    setTotalPrice(total=>total+cartItem[i].price)
    }
},[cartItem])


function checkLogin(){
  if(isLogin){
    console.log('go for payment')
    navigation.navigate('address')
  }else{
    console.log('login warning')
    navigation.navigate('Login')
  setWarning(true)
}
}


  return (
    <View>
      {cartItem.length==0?
      <View>
        <Text>cart is Empty</Text>
      </View>:
      <View>

      <Text>Cart Items</Text>
      <FlatList
        data={cartItem}
        renderItem={({item,index})=>{
         return (<View>
         <View className='flex-row gap-1 m-1 bg-yellow-100'>
            <Image source={{uri:item.image}} className='w-14 h-14'></Image>
            <View>
            <Text>{item.title}</Text>
            <View className='flex-row justify-around'>
            <Text>₹{item.price}</Text>
            <TouchableOpacity onPress={()=>dispatch(removeCartItem(item.id))}>
            <Text className='text-red-400 font-semibold'>remmove</Text>
            </TouchableOpacity>
            </View>
            </View>
         </View>
        
            </View>
        )}}
      />

            <View className=' shadow-red-200 m-2 p-2 border rounded-lg '>
            <Text className='text-md'>Your order Summary</Text>
            <FlatList
                data={cartItem}
                renderItem={({item,index})=>(
                    <View className=''>
                    <View className='flex-row p-1 justify-around border-b-0.5'>
            <Text className=''>{item.title.substring(0,10)}</Text>
            <Text className=''>₹{item.price}</Text>
           
                    </View>

                    </View>
                )}
            />
            <View className='flex-row items-center justify-between'>
            <Text>Total</Text>
            <Text className='mt-2'>₹{totalPrice}</Text>
            </View>
            <Button title='checkout' onPress={checkLogin}/>
         </View>
         </View>
      
      }
     {warning && <WarningModal message={'please login to checkout'}/>}
    </View>
  )
}
