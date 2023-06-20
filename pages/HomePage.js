import { View, Text, Image, FlatList, Modal, Button, TouchableOpacity, DrawerLayoutAndroid, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItem, setWishItem} from '../redux/slices/cartSlice'
import { setdrawer } from '../redux/slices/navbarSlice'
import Icon2 from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [showProduct, setShowProduct] = useState()
  const [filterProduct, setFilterProduct] = useState([])
  const [modVisible, setModVisible] = useState(false)
  const[count,setCount]=useState(1)

  const { isSearch, searchParam, openDrawer } = useSelector(state => state.navbarReducer)
  const dispatch = useDispatch()
  const { wishItem } = useSelector(state => state.cartReducer)
  const drawer = useRef()
  useEffect(() => {
    const newArr = products.filter((item) => { return item.title.includes(searchParam) });
    setFilterProduct(newArr)
  }, [searchParam])


  const handledecrease=()=>{
    if(count>1)
setCount(count-1)
  }
  const handleincrease=()=>{
    
setCount(count+1)
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res=> res.json())
      .then(json=> {
     
        setProducts(json)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (openDrawer)
      drawer.current.openDrawer()
    else
      drawer.current.closeDrawer()

  }, [openDrawer])

  const navigationView = () => (
    <View className=' p-1'>
    <View className='flex-row bg-slate-200 rounded-xl px-1 justify-between items-center'>
    <TouchableOpacity className='cursor-pointer' onPress={() => dispatch(setdrawer(false))}>
    <Icon2 name='x' size={30} color={'black'}/>
    </TouchableOpacity>
      <Text className='text-lg'>WishList Items</Text>
     </View>
      <View>
        {wishItem.length > 0 ? <FlatList data={wishItem}
          renderItem={({ item, index }) => {
            return (
              <View className='bg-slate-200 mt-2 rounded-2xl'>
               <View className='flex-row gap-2   p-1'>
                <Image source={{ uri: item.image }} className='w-16 h-16  rounded-lg'></Image>
               <View>
                <Text>{item.title.substring(0,10)}</Text>
                <Text>₹{item.price}</Text>
                </View>
                </View>
                
                <View className='flex-row justify-around'>
                <TouchableOpacity onPress={() =>{
                   dispatch(setCartItem({
                    item:item,
                    quantity:count}))
                   ToastAndroid.show('item successfully added')
                   }}>
                <Text className='font-semibold text-blue-600'>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(setCartItem(item))}>
                <Text className='font-semibold text-red-600'>Remove</Text>
                </TouchableOpacity>
                </View>
              </View>
            )
          }}
        /> :
          <Text>your WishList is Empty</Text>
        }
      </View>


    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'right'}
      renderNavigationView={navigationView}>
      <View className=''>
        <FlatList data={isSearch ? filterProduct : products}
        numColumns={2}
         renderItem={({ item, index }) => {
          return (
            <View key={index} className=' items-center'>
              <TouchableOpacity className=' rounded-xl p-2 bg-slate-200  w-44 m-4 ' onPress={() => {
                setShowProduct(item)
                setModVisible(true)
              }}>
                <Image source={{ uri: item.image }} className='w-full h-36 object-contain rounded-lg'></Image>
                <View className='p-1 '>
                  <Text  className='font-semibold text-center'>{item.title.substring(0,10)}</Text>
                  <Text className='text-red-500 text-lg font-bold text-center'>₹{item.price}</Text>
                </View>
              </TouchableOpacity>

              {/* to show modal of product details */}
              {(showProduct?.id === item.id) &&
                <View  >
                  <Modal
                    animationType="fade"
                    visible={modVisible}
                    transparent={true}
                    onRequestClose={() => {
                      setModVisible(!modVisible);
                    }}>
                    <View className=' justify-center h-screen p-2 bg-white opacity-90'>
                      <View className='flex items-center bg-white m-5 rounded-lg relative p-2' >
                        <Image source={{ uri: showProduct.image }} className=' w-52 h-52 '></Image>
                        <Text className='font-semibold text-black mt-5'>{showProduct.title}</Text>
                        <Text className='font-semibold'>{showProduct.description}</Text>

                        <View className='flex-row justify-between w-full mt-5'>
                        <View className='flex-row rounded-lg'>
                        <TouchableOpacity onPress={handledecrease}>
                          <Text className='w-8 h-8 text-lg bg-slate-200 text-center'>-</Text>
                        </TouchableOpacity>
                        <View>
                          <Text className='w-8 h-8 text-lg bg-pink-200 text-center'>{count}</Text>
                        </View>
                        <TouchableOpacity onPress={handleincrease}>
                          <Text className='w-8 h-8 text-lg bg-slate-200 text-center'>+</Text>
                        </TouchableOpacity>
                        </View>
                        
                        <Text className='text-green-500 text-lg font-bold'>₹{showProduct.price}</Text>
                        </View>
                        
                        <View className='flex-row w-full justify-around mt-5'>
                        <TouchableOpacity className='cursor-pointer bg-slate-200 p-2 rounded-xl' onPress={() => dispatch(setWishItem(showProduct))}>
                          <Text className='font-semibold text-blue-600'>Add to WishList</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-slate-200 p-2 rounded-xl' onPress={() =>{
                         dispatch(setCartItem({
                          item:showProduct,
                          quantity:count
                          }))}
                         
                         }>
                        <Text className='font-semibold text-red-600 cursor-pointer'>Add to Cart</Text>
                        </TouchableOpacity>
                        </View>
                      
                        <TouchableOpacity className='absolute right-1 top-1' onPress={() => setModVisible(!modVisible)}>
                        <Icon2 name='x' size={30} color={'black'}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>

              }
            </View>)
        }} />



      </View>


    </DrawerLayoutAndroid>
  )
}