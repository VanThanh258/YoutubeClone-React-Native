import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import VideoCardHome from '../components/VideoCardHome'
import { useDispatch,useSelector } from 'react-redux';
import SubHeader from '../components/SubHeader'
import { fetchVideo } from '../src/store/videoSlice';
const Home = ({navigation}) => {
  const video = useSelector(state => state.video)
  const dispatch = useDispatch();
  const {listVideo, status} = video
  const list = listVideo.items
  useEffect(() => {
    dispatch(fetchVideo());
  },[])
  const handleNavigationToWatchVideo = () => {
    navigation.navigate('WatchVideo')
  }
  // let d = new Date("2022-09-03T04:30:13Z");
  // let date = d.getTime();
  // console.log(date)
  // render view home
  const renderItem = ({item,index}) => {
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
      viewString = (item.statistics.viewCount / 1000000).toFixed(1) + 'm'
    }else if(viewString > 1000){
      viewString = (item.statistics.viewCount / 1000).toFixed(1) + 'k'
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
  //go to search
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