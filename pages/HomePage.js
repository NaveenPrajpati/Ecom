import { View, Text, Image, FlatList, Modal, Button, TouchableOpacity, DrawerLayoutAndroid, ScrollView } from 'react-native'
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

  const { isSearch, searchParam, openDrawer } = useSelector(state => state.navbarReducer)
  const dispatch = useDispatch()
  const { wishItem } = useSelector(state => state.cartReducer)
  const drawer = useRef()
  useEffect(() => {
    const newArr = products.filter((item) => { return item.title.includes(searchParam) });
    setFilterProduct(newArr)
  }, [searchParam])


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
    <View className='bg-yellow-100 p-1'>
      <Text >WishList Items</Text>
      <Button
        title="Close drawer"
        onPress={() => dispatch(setdrawer(false))} />
      <View>
        {wishItem.length > 0 ? <FlatList data={wishItem}
          renderItem={({ item, index }) => {
            return (
              <View className=''>
                {console.log(item)}
                <Image source={{ uri: item.image }} className='w-16 h-16'></Image>
                <Text>{item.title}</Text>
                <Text>₹{item.price}</Text>

                
                <View className='flex '>
                <TouchableOpacity onPress={() => dispatch(setCartItem(item))}>
                <Text>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(setCartItem(item))}>
                <Text>remove</Text>
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
              <TouchableOpacity className=' rounded-lg p-2 shadow-xl shadow-black  w-44 m-4 ' onPress={() => {
                
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
                    <View className=' justify-center h-screen p-2 '>
                      <View className='flex items-center bg-white rounded-lg relative p-2' >
                        <Image source={{ uri: showProduct.image }} className=' w-52 h-52 '></Image>
                        <Text className='font-semibold text-black mt-5'>{showProduct.title}</Text>
                        <Text className='font-semibold'>{showProduct.description}</Text>
                        <View className='flex-row justify-around'>
                        <View>
                          <Text>  quantity</Text>
                        </View>
                        <Text className='text-green-500 text-lg font-bold'>₹{showProduct.price}</Text>
                        </View>
                        
                        <View className='flex-row justify-around '>
                        <TouchableOpacity className='' onPress={() => dispatch(setWishItem(showProduct))}>
                          <Text>Add to WishList</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(setCartItem(showProduct))}>
                        <Text>Add to Cart</Text>

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