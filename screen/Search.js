import { View, Text } from 'react-native'
import React from 'react'
import HeaderSearch from '../components/HeaderSearch'
import VideoCardSearch from '../components/VideoCardSearch'

const Search = ({navigation}) => {
  const handleNavigation = () => {
    navigation.goBack()
  }
  return (
    <View>
      <HeaderSearch onGoBack = {handleNavigation}/>
      <VideoCardSearch />
    </View>
  )
}

export default Search