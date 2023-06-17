import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CheckoutPage() {
  const {checkoutData}=useSelector(state=>state.cartReducer)
    const dispatch=useDispatch()
  useEffect(() => {
    
  
    
  }, [])
  
  return (
    <View>
      <Text>CheckoutPage</Text>
    </View>
  )
}