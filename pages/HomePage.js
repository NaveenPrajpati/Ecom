import { View, Text, Image, FlatList, Modal, Button, TouchableOpacity, DrawerLayoutAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import NavbarBottom from '../components/NavbarBottom'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { setCartItem, setWishItem, useMyRef } from '../redux/slices/cartSlice'
import { setdrawer } from '../redux/slices/navbarSlice'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [showProduct, setShowProduct] = useState()
  const[modalContent,setModalContent]=useState({})
  const[filterProduct,setFilterProduct]=useState([])
  const[modVisible,setModVisible]=useState(false)
  
  const {isSearch,searchParam,openDrawer}=useSelector(state=>state.navbarReducer)
  const {wishItem}=useSelector(state=>state.cartReducer)
const drawer=useRef()
  const dispatch=useDispatch()
useEffect(()=>{
 const newArr=products.filter((item)=>{return item.title.includes(searchParam)});
 setFilterProduct(newArr)
},[searchParam])


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json)      
      })
      .catch(error=>console.log(error))
  }, [])

  useEffect(()=>{
    if(openDrawer)
    drawer.current.openDrawer()
    else
    drawer.current.closeDrawer()

  },[openDrawer])

  const navigationView = () => (
    <View className='bg-yellow-100 p-1'>
      <Text >WishList Items</Text>
      <Button
        title="Close drawer"
        onPress={() => dispatch(setdrawer(false))}/>
        <View>
      {wishItem.length>0?<FlatList data={wishItem}
          renderItem={({item,index})=>{ return (
            <View className=''>
            {console.log(item)}
       <Image source={{uri:item.image} } className='w-16 h-16'></Image>
               <Text>{item.title}</Text>
              <Text>₹{item.price}</Text>
              <Button title='Add to Cart' onPress={()=>dispatch(setCartItem(item))}></Button>
              <Button title='remove' onPress={()=>dispatch(setCartItem(item))}></Button>
        </View>
          )}}
        />:
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
      
    <View>
      <Navbar />

      <View className=' mb-32'>
        <FlatList data={isSearch?filterProduct:products} renderItem={({ item,index }) =>
        { return(
          <View key={index}>
          <TouchableOpacity  className='flex-row gap-1 p-2 shadow-xl shadow-slate-400 ' onPress={()=>{
            console.log(item)
           setShowProduct(item)
            setModVisible(true)}}>
            
            <Image source={{uri:item.image} } className='w-14 h-14'></Image>
            <View className='p-1'>
              <Text>{item.title}</Text>
              <Text>₹{item.price}</Text>
            </View>
           

          </TouchableOpacity>
          {(showProduct?.id===item.id ) &&
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
        <Image source={{uri:showProduct.image} } className='w-36 h-36 '></Image>
              <Text>{showProduct.title}</Text>
              <Text>{showProduct.description}</Text>
              <Text>₹{showProduct.price}</Text>
              <Button title='like' onPress={()=>dispatch(setWishItem(showProduct))}></Button>
              <Button title='Add to Cart' onPress={()=>dispatch(setCartItem(showProduct))}></Button>
            <TouchableOpacity className='absolute right-1 top-1' onPress={()=>setModVisible(!modVisible)}>
              <Text>close</Text>
            </TouchableOpacity>
            </View>
            </View>
      </Modal>
          </View>
      
      }
          </View>)
        }} />
      <NavbarBottom/>
      </View>
    </View>
    </DrawerLayoutAndroid>
  )
}