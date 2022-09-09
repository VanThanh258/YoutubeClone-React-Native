import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import VideoCardHome from '../components/VideoCardHome'
import { useDispatch,useSelector } from 'react-redux';
import SubHeader from '../components/SubHeader'
import { fetchVideo } from '../src/store/videoSlice';
const Home = ({navigation}) => {
  const video = useSelector(state => state.video)
  const dispatch = useDispatch();
  const {listVideo} = video
  const list = listVideo.items
  useEffect(() => {
    dispatch(fetchVideo())
  },[])
  const renderItem = ({item}) => {
    return (
        <VideoCardHome thumbnail = {item.snippet.thumbnails.high.url} />
    )
  }
  const handleNavigation = () => {
    navigation.navigate('Search')
  }
  return (
    <View style={{marginBottom: 70}}>
        <Header onNavigation = {handleNavigation}/>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Home