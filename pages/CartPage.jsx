import { View, Text, FlatList, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem } from '../redux/slices/cartSlice'
import WarningModal from '../components/WarningModal'

export default function CartPage() {
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
  }else{
    console.log('login warning')
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
         <View className='flex-row gap-1 m-1'>
            <Image source={{uri:item.image}} className='w-14 h-14'></Image>
            <View>
            <Text>{item.title}</Text>
            <View className='flex-row justify-between'>
            <Text>₹{item.price}</Text>
            <Button title='remmove' color={'red'} onPress={()=>dispatch(removeCartItem(item.id))}></Button>
            </View>
            </View>
         </View>
        
            </View>
        )}}
      />

            <View className='bg-slate-300'>
            <Text>Your order Summary</Text>
            <FlatList
                data={cartItem}
                renderItem={({item,index})=>(
                    <View className='bg-slate-200 m-1'>
                    <View className='flex-row p-1 justify-around border-b-2'>
            <Text>{item.title.substring(0,10)}</Text>
            <Text>₹{item.price}</Text>
           
                    </View>

                    </View>
                )}
            />
            <Text>₹{totalPrice}</Text>
            <Button title='buy' onPress={checkLogin}/>
         </View>
         </View>
      
      }
     {warning && <WarningModal message={'please login to checkout'}/>}
    </View>
  )
}
