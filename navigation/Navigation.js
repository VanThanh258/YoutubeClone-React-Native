import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import Search from '../screen/Search'
import WatchVideo from '../screen/WatchVideo'
const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='BottomTab' screenOptions={{headerShown: false}}>
            <Stack.Screen name ='Search' component={Search}/>
            <Stack.Screen name ='BottomTab' component={BottomTabNavigator}/>
            <Stack.Screen name = 'WatchVideo' component={WatchVideo}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation