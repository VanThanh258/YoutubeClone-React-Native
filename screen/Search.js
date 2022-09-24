import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import HeaderSearch from "../components/HeaderSearch";
import VideoCard from "../components/VideoCard";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoSearch } from "../src/store/searchSlice";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { videoSliceAction } from "../src/store/videoSlice";
import { channelSliceAction } from "../src/store/channelSlice";
import VideoCardSearch from "../components/VideoCardSearch";
const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const videoSearch = useSelector((state) => state.search);
  const { listVideoSearch } = videoSearch;

  useEffect(() => {
    dispatch(fetchVideoSearch(params.search));
  }, []);

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
    // const action1 = videoSliceAction.updateVideoId(item.id.videoId);
    // dispatch(action1);
    // const action2 = channelSliceAction.updateChannelId(item.snippet.channelId);
    // dispatch(action2);
    navigation.push("VideoPlayerSearch");
  };
  const handleNavigation = () => {
    navigation.popToTop();
  };
  const handleFocus = () => {
    navigation.pop(1);
  };

  let timeString = useRef("");

  const showTime = (date) =>  {
    let datePublicVideo = new Date(date);
    let dateNow = new Date();
    let time = dateNow - datePublicVideo;
    if (time > 31104000000) {
      timeString =
        Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12) + " năm trước";
    } else if (time > 2592000000) {
      timeString = Math.floor(time / 1000 / 60 / 60 / 24 / 30) + " tháng trước";
    } else if (time > 86400000) {
      timeString = Math.floor(time / 1000 / 60 / 60 / 24) + " ngày trước";
    } else if (time > 3600000) {
      timeString = Math.floor(time / 1000 / 60 / 60) + " giờ trước";
    } else if (time > 60000) {
      timeString = " vài phút trước";
    }
    return timeString;
  }

  const renderItem = ({ item }) => {
    showTime(item.snippet.publishedAt);
    return (
      <VideoCardSearch
        onNavigation={() => handleNavigationToVideoPlayer(item)}
        thumbnail={item.snippet.thumbnails.high.url}
        title={item.snippet.title}
        channelTitle={item.snippet.channelTitle}
        time={timeString}
        channelId={item.snippet.channelId}
        videoId={item.id.videoId}
      />
    );
  };

  return (
    <View>
      <HeaderSearch
        onGoBack={handleNavigation}
        value={params.search}
        onFocus={handleFocus}
      />
      <View style={{ marginBottom: 100 }}>
        <FlatList
          data={listVideoSearch}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
});
