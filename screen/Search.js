import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import HeaderSearch from "../components/HeaderSearch";
import VideoCard from "../components/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoSearch } from "../src/store/searchSlice";
import { videoSliceAction } from "../src/store/videoSlice";
import { channelSliceAction } from "../src/store/channelSlice";
import { useEffect } from "react";

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const keyWord = useSelector(state => state.search.keyWord);
  const listVideoSearch = useSelector((state) => state.search.listVideoSearch);
  const listVideo = useSelector(state => state.video.listVideo)

  useEffect(() => {
    dispatch(fetchVideoSearch(keyWord));
  }, []);

  const handleNavigationToVideoPlayer = (item) => {
    const actionUpdateVideoId = videoSliceAction.updateVideoId(item.id);
    dispatch(actionUpdateVideoId);
    const actionUpdateChannelId = channelSliceAction.updateChannelId(item.snippet.channelId);
    dispatch(actionUpdateChannelId)
    navigation.push("VideoPlayer");
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
        onNavigation={handleNavigationToVideoPlayer}
        channelId={item.snippet.channelId}
        videoId={item.id.videoId}
      />
    );
  };

  return (
    <View>
      <HeaderSearch
        onGoBack={handleNavigation}
        value={keyWord}
        onFocus={handleFocus}
      />
      <View style={{ marginBottom: 100 }}>
        <FlatList
          data={listVideoSearch}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.videoId}
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
