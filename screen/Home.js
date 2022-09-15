import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, StatusBar,Animated } from 'react-native'
import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import VideoCardHome from '../components/VideoCardHome'
import { useDispatch,useSelector } from 'react-redux';
import SubHeader from '../components/SubHeader'
import  Constants  from 'expo-constants'
import videoSlice, { fetchVideo, fetchVideoNation, videoSliceAction } from '../src/store/videoSlice';
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { fetchNation } from '../src/store/nationSlice';
import { useRef } from 'react';
const headerHeight = Constants.statusBarHeight + 80
let index = 0;
const Home = ({navigation}) => {
  const video = useSelector(state => state.video)
  const nation = useSelector(state => state.nation)
  const dispatch = useDispatch();
  const {listVideo, status} = video
  const {listNation} = nation
  useEffect( () => {
    dispatch(fetchVideo());
  },[])
  useEffect(() => {
    dispatch(fetchNation());
  },[])
  const renderItem = ({item}) => {
    let datePublicVideo =  new Date(item.snippet.publishedAt);
    let dateNow = new Date();
    let time = dateNow - datePublicVideo;
    let timeString;
    if(time > 31104000000){
      timeString = Math.floor(time/1000/60/60/24/30/12 ) + ' năm trước'
    }else if(time > 2592000000){
      timeString = Math.floor(time/1000/60/60/24/30) + ' tháng trước'
    }else if(time > 86400000){
      timeString = Math.floor(time/1000/60/60/24) + ' ngày trước'
    }else if(time > 3600000){
      timeString = Math.floor(time/1000/60/60) + ' giờ trước'
    }else if(time > 60000){
      timeString = ' vài phút trước'
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
    navigation.push('WatchVideo')
  }
  const handleNavigation = () => {
    navigation.navigate('SubSearch')
  }
  //Animation hide Header
  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY,0,headerHeight)
  const translateY = diffClamp.interpolate({
    inputRange:[0,headerHeight],
    outputRange:[0,-headerHeight]
  })
  const handleScoll = (e)=>{
    scrollY.setValue(e.nativeEvent.contentOffset.y);
    if(listNation){
      if(e.nativeEvent.contentOffset.y > listVideo.length * 300){
        index = ++index;
        dispatch(fetchVideoNation(listNation[index].id))
      }
    }
  }
  // const scrollY = useSharedValue(0)
  // const rStyle = useAnimatedStyle(() => {
  //   const translateY = interpolate(
  //     scrollY.value,
  //     [0,headerHeight],
  //     [0,-headerHeight]
  //   )
  //   return{
  //      transform: [
  //        {
  //       translateY: translationY.value,
  //      },
  //      ],
  //   }
  // })
  // const scrollHandler = useAnimatedScrollHandler((event) => {
  //   scrollY.value = event.contentOffset.y;
  // });
  return (
    <View style={styles.container}>
      <StatusBar/>
        <Animated.View style={[styles.headerContainer,{transform:[
          {translateY:translateY }
        ],}]}>
          <Header onNavigation = {handleNavigation}/>
          <SubHeader/>
        </Animated.View>
        <FlatList
          style={{paddingTop: headerHeight}}
          data={listVideo}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onScroll={handleScoll}
          scrollEventThrottle={16}
        />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  headerContainer:{
    position:'absolute',
    zIndex: 1000,
    height: headerHeight,
    elevation: 4,
  }
})