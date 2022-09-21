import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../components/SubHeader";
import Constants from "expo-constants";
import { fetchVideo, videoSliceAction } from "../src/store/videoSlice";
import { channelSliceAction } from "../src/store/channelSlice";
const headerHeight = Constants.statusBarHeight + 80;
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { listVideo, status } = video;

  useEffect(() => {
    dispatch(fetchVideo());
  }, []);

  let timeString = useRef("");
  let viewString = useRef("");

  const showTime = (date) => {
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

  const showView = (view) => {
    if (view > 1000000) {
      viewString = (view / 1000000).toFixed(1) + "m" + " lượt xem";
    } else if (view > 1000) {
      viewString = (view / 1000).toFixed(0) + "k" + " lượt xem";
    }
    return viewString;
  }

  const renderItem = ({ item }) => {
    showTime(item.snippet.publishedAt);
    showView(item.statistics.viewCount);
    return (
      <VideoCard
        onNavigation={() => handleNavigationToVideoPlayer(item)}
        thumbnail={item.snippet.thumbnails.high.url}
        title={item.snippet.title}
        channelTitle={item.snippet.channelTitle}
        view={viewString}
        time={timeString}
        channelId={item.snippet.channelId}
      />
    );
  };

  const handleNavigationToVideoPlayer = (item) => {
    const action1 = videoSliceAction.updateVideoId(item.id);
    dispatch(action1);
    const action2 = channelSliceAction.updateChannelId(item.snippet.channelId);
    dispatch(action2);
    navigation.push("VideoPlayer");
  };

  const handleNavigation = () => {
    navigation.push("SubSearch");
  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, headerHeight);
  const translateY = diffClamp.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });
  const handleScoll = (e) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Animated.View
        style={[
          styles.headerContainer,
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <Header onNavigation={handleNavigation} />
        <SubHeader />
      </Animated.View>
      <View>
        <FlatList
          style={{ paddingTop: headerHeight }}
          data={listVideo}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={handleScoll}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
};

export default React.memo(Home, () => true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    zIndex: 1000,
    height: headerHeight,
    elevation: 4,
  },
});
