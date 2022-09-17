import { View, Text,FlatList, StyleSheet } from 'react-native'
import React from 'react'
import HeaderSearch from '../components/HeaderSearch'
import VideoCard from '../components/VideoCard'
import { useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideoSearch } from '../src/store/searchSlice'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { videoSliceAction } from '../src/store/videoSlice'
const Search = ({navigation}) => {
  const {params} = useRoute()
  const dispatch = useDispatch();
  const videoSearch = useSelector(state => state.search);
  const {listVideoSearch} = videoSearch;
  useEffect(() => {
    dispatch(fetchVideoSearch(params.search));
  },[])
  // let viewString;
  // for(let i = 0; i<listVideo1.length; i++){
  //   let viewString = listVideo1[i].statistics.viewCount;
  //   if(viewString > 1000000){
  //     viewString = (listVideo1[i].statistics.viewCount / 1000000).toFixed(1) + 'm'
  //   }else if(viewString > 1000){
  //     viewString = (listVideo1[i].statistics.viewCount / 1000).toFixed(0) + 'k'
  //   }
  // }
  const handleNavigationToVideoPlayer = (item) => {
    const action = videoSliceAction.updateVideoId(item.id.videoId)
    dispatch(action);
    navigation.push('VideoPlayer')
  }
  const handleNavigation = () => {
    navigation.popToTop()
  }
  const handleFocus = () => {
    navigation.pop(1)
  }
  let timeString = useRef('');
  let viewString = useRef('');
function showTime(date){
  let datePublicVideo =  new Date(date);
  let dateNow = new Date();
  let time = dateNow - datePublicVideo;
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
  return timeString
}

function showView(view){
  if(view > 1000000){
    viewString = (view / 1000000).toFixed(1) + 'm' + ' lượt xem'
  }else if(view > 1000){
    viewString = (view / 1000).toFixed(0) + 'k' + ' lượt xem'
  }
  return viewString
}
  const renderItem = ({item}) => {
    showTime(item.snippet.publishedAt);
    return (
        <VideoCard
        onNavigation = {() => handleNavigationToVideoPlayer(item)}
        thumbnail={item.snippet.thumbnails.high.url} 
        title={item.snippet.title}
        channelTitle={item.snippet.channelTitle}
        // view={viewString}
        time = {timeString}
        />
    )
  }
  return (
    <View>
      <HeaderSearch 
      onGoBack = {handleNavigation} 
      value = {params.search}
      onFocus = {handleFocus}
      />
      <View style={{marginBottom: 100}}>
      <FlatList
          data={listVideoSearch}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: 10
  }
})