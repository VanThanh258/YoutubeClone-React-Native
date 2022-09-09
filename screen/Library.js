import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const Library = ({navigation}) => {
  const handleNavigation = () =>{
    navigation.navigate('Search')
  }
  return (
    <View>
        <Header onNavigation = {handleNavigation}/>
      <Text>Library</Text>
    </View>
  )
}

export default Library