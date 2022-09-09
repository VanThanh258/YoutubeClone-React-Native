import { View, Text,Image } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screen/Home'
import Shorts from '../screen/Shorts'
import Subcription from '../screen/Subcription'
import Library from '../screen/Library'
const Tab = createMaterialBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
        <Tab.Navigator
        initialRouteName='Home'
        shifting={false}
        inactiveColor='black'
        barStyle={{backgroundColor: '#FFFFFF', paddingVertical: 5, paddingHorizontal: 10}}
        screenOptions={() => ({

        })}
        >
            <Tab.Screen 
            name='Home' 
            component={Home} 
            options={{
                title: 'Trang chủ',
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return (<Image source={require('../images/imageBottom/Home-focus.png')}/>)
                    }else{
                        return (<Image source={require('../images/imageBottom/Home.png')}/>)
                    }
                }
                }} />
            <Tab.Screen 
            name='Shorts' 
            component={Shorts} 
            options={{
                title: 'Shorts',
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return (<Image source={require('../images/imageBottom/Short-focus.png')}/>)
                    }else{
                        return (<Image source={require('../images/imageBottom/Short.png')}/>)
                    }
                }
                }}/>
            <Tab.Screen 
            name='Subcription' 
            component={Subcription} 
            options={{
                title: 'Kênh đăng ký',
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return (<Image source={require('../images/imageBottom/Subcription-focus.png')}/>)
                    }else{
                        return (<Image source={require('../images/imageBottom/Subcription.png')}/>)
                    }
                },
                tabBarBadge: true
                }}/>
            <Tab.Screen 
            name='Library' 
            component={Library} 
            options={{
                title: 'Thư viện',
                tabBarIcon: ({focused}) => {
                    if(focused){
                        return (<Image source={require('../images/imageBottom/Library-focus.png')}/>)
                    }else{
                        return (<Image source={require('../images/imageBottom/Library.png')}/>)
                    }
                }
                }}/>
        </Tab.Navigator>
  )
}

export default BottomTabNavigator