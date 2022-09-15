import { View, Text,FlatList } from 'react-native'
import React from 'react'
import HeaderSearch from '../components/HeaderSearch'
import VideoCardHome from '../components/VideoCardHome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideoSearch } from '../src/store/searchSlice'
import { fetchVideo } from '../src/store/videoSlice'
const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const videoSearch = useSelector(state => state.search);
  const video = useSelector(state => state.video)
  const {listVideoSearch} = videoSearch;
  // let viewString;
  // for(let i = 0; i<listVideo1.length; i++){
  //   let viewString = listVideo1[i].statistics.viewCount;
  //   if(viewString > 1000000){
  //     viewString = (listVideo1[i].statistics.viewCount / 1000000).toFixed(1) + 'm'
  //   }else if(viewString > 1000){
  //     viewString = (listVideo1[i].statistics.viewCount / 1000).toFixed(0) + 'k'
  //   }
  // }
  const handleNavigationToWatchVideo = () => {
    navigation.navigate('WatchVideo')
  }
  const handleSearchVideo = () => {
    // dispatch(fetchVideoSearch(search));
  }
  const handleNavigation = () => {
    navigation.popToTop()
  }
  const handleChangeText = () => {

  }
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
    return (
        <VideoCardHome 
        onNavigation = {handleNavigationToWatchVideo}
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
      onSearch = {handleSearchVideo} 
      onChangeText = {handleChangeText}/>
      <FlatList
          data={listVideoSearch}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </View>
  )
}

export default Search