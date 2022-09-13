import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import VideoCardHome from '../components/VideoCardHome'
import { useDispatch,useSelector } from 'react-redux';
import SubHeader from '../components/SubHeader'
import videoSlice, { fetchVideo, videoSliceAction } from '../src/store/videoSlice';

const Home = ({navigation}) => {
  const video = useSelector(state => state.video)
  const channel = useSelector(state => state.channel)
  const dispatch = useDispatch();
  const {listVideo, status} = video
  const list = listVideo.items
  const {listChannel} = channel;
  useEffect( () => {
    dispatch(fetchVideo());
  },[])
  const renderItem = ({item}) => {
    let datePublicVideo =  new Date(item.snippet.publishedAt);
    let dateNow = new Date();
    let time = dateNow - datePublicVideo;
    let timeString;
    if(time > 31104000000){
      timeString = Math.floor(time/1000/60/60/24/30/12 ) + ' Năm trước'
    }else if(time > 2592000000){
      timeString = Math.floor(time/1000/60/60/24/30) + ' Tháng trước'
    }else if(time > 86400000){
      timeString = Math.floor(time/1000/60/60/24) + ' Ngày trước'
    }else if(time > 3600000){
      timeString = Math.floor(time/1000/60/60) + ' Giờ trước'
    }else if(time > 60000){
      timeString = ' Vài phút trước'
    }
    let viewString = item.statistics.viewCount;
    if(viewString > 1000000){
      viewString = (item.statistics.viewCount / 1000000).toFixed(1) + 'm' + ' lượt xem'
    }else if(viewString > 1000){
      viewString = (item.statistics.viewCount / 1000).toFixed(0) + 'k' + ' lượt xem'
    }
    return (
        <VideoCardHome 
        onNavigation = {handleNavigationToWatchVideo}
        thumbnail={item.snippet.thumbnails.high.url} 
        title={item.snippet.title}
        channelTitle={item.snippet.channelTitle}
        view={viewString}
        time = {timeString}
        />
    )
  }
  
  //navigation
  const handleNavigationToWatchVideo = () => {
    navigation.navigate('WatchVideo')
  }
  const handleNavigation = () => {
    navigation.navigate('Search')
  }
  
  return (
    <View style={styles.container}>
        <Header onNavigation = {handleNavigation}/>
        <SubHeader />
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})