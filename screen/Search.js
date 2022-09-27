import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import HeaderSearch from "../components/HeaderSearch";
import VideoCard from "../components/VideoCard";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoSearch } from "../src/store/searchSlice";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const videoSearch = useSelector((state) => state.search);
  const { listVideoSearch } = videoSearch;

  useEffect(() => {
    dispatch(fetchVideoSearch(params.search));
  }, []);

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

  const renderItem = ({ item }) => {
    return (
      <VideoCard
        onNavigation={() => handleNavigationToVideoPlayer(item)}
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
