import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import SubSearch from '../screen/SubSearch'
import VideoPlayer from '../screen/VideoPlayer'
import Search from '../screen/Search'
import VideoPlayerSearch from '../screen/VideoPlayerSearch'
const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='BottomTab' screenOptions={{headerShown: false}}>
            <Stack.Screen name ='SubSearch' component={SubSearch}/>
            <Stack.Screen name ='BottomTab' component={BottomTabNavigator}/>
            <Stack.Screen name = 'VideoPlayer' component={VideoPlayer}/>
            <Stack.Screen name = 'Search' component={Search}/>
            <Stack.Screen name = 'VideoPlayerSearch' component={VideoPlayerSearch}/>
        </Stack.Navigator>
    </NavigationContainer>          
  )
}

export default Navigation