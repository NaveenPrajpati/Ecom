/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { store } from './redux/store';


const Stack=createNativeStackNavigator()
const App= () =>  {
 

  return (
    <Provider store={store}>
    <NavigationContainer>
    
    <Stack.Navigator>
<Stack.Screen name='Home'  component={HomePage}  options={{headerShown:false}}/>
<Stack.Screen name='Login' component={Login}/>
</Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};



export default App;
