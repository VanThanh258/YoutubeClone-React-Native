import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel } from "../src/store/channelSlice";
import { fetchOneVideo } from "../src/store/videoSlice";
import { useRef } from "react";

const VideoCard = ({ channelId, onNavigation, videoId }) => {
  const dispatch = useDispatch();
  const listChannel = useSelector((state) => state.channel.listChannel);
  const channel = listChannel.find((item) => item.id === channelId);
  const listVideo = useSelector((state) => state.video.listVideo);
  const video = listVideo.find((item) => item.id === videoId);
  
  useEffect(() => {
    dispatch(fetchChannel(channelId));
  }, []);

  useEffect(() => {
    dispatch(fetchOneVideo(videoId));
  }, []);

  const timeVideo = useRef("");

  const YTDurationToSeconds = (duration) => {
    if(duration === 'P0D'){
      duration = 'PT0S'
    }else if(duration === 'P2DT8H46M15S'){
      duration = 'PT2D8H46M15S'
    }else if(duration === 'P1DT5H37M5S'){
      duration = 'PT1D5H37M5S'
    }
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    match = match.slice(1).map(function (x) {
      if (x != null) {
        return x.replace(/\D/, "");
      }
    });
    
    let hours = parseInt(match[0]) || 0;
    let minutes = parseInt(match[1]) || 0;
    let seconds = parseInt(match[2]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  };

  const showTimeVideo = (time) => {
    let hours
    let minutes
    let seconds
    let timeVideo
    if(time > 3600){
      hours = Math.floor(time/3600)
      minutes = Math.floor(time % 3600 / 60)
      seconds = Math.floor(time % 3600 % 60)
      if(minutes < 10 && seconds > 10){
        timeVideo = `${hours}:0${minutes}:${seconds}`
      }else if(minutes > 10 && seconds < 10){
        timeVideo = `${hours}:${minutes}:0${seconds}`
      }else if(minutes < 10 && seconds < 10){
        timeVideo = `${hours}:0${minutes}:0${seconds}`
      }else {
        timeVideo = `${hours}:${minutes}:${seconds}`
      }
    }else if(time > 60){
      minutes = Math.floor(time % 3600 / 60)
      seconds = Math.floor(time % 3600 % 60)
      if(seconds > 10){
        timeVideo = `${minutes}:${seconds}`;
      }else {
        timeVideo = `${minutes}:0${seconds}`;
      }
    }else {
      seconds = Math.floor(time % 3600 % 60)
      timeVideo = `0:${seconds}`;
    }
    return timeVideo;
  }

  const showDate = (date) => {
    let dateVideo;
    let datePublicVideo = new Date(date);
    let dateNow = new Date();
    let time = dateNow - datePublicVideo;
    if (time > 31104000000) {
      dateVideo =
        Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12) + " năm trước";
    } else if (time > 2592000000) {
      dateVideo = Math.floor(time / 1000 / 60 / 60 / 24 / 30) + " tháng trước";
    } else if (time > 86400000) {
      dateVideo = Math.floor(time / 1000 / 60 / 60 / 24) + " ngày trước";
    } else if (time > 3600000) {
      dateVideo = Math.floor(time / 1000 / 60 / 60) + " giờ trước";
    } else if (time > 60000) {
      dateVideo = " vài phút trước";
    }
    return dateVideo;
  };

  const showView = (view) => {
    let viewVideo;
    if (view > 1000000) {
      viewVideo = (view / 1000000).toFixed(1) + "Tr" + " lượt xem";
    } else if (view > 1000) {
      viewVideo = (view / 1000).toFixed(0) + "N" + " lượt xem";
    }
    return viewVideo;
  };

  const viewString = showView(video?.statistics.viewCount);
  const dateString = showDate(video?.snippet.publishedAt);
  if(video){
    const time = YTDurationToSeconds(video.contentDetails.duration);
    timeVideo.current = showTimeVideo(time)
  }
  

  return (
    <Pressable style={{ marginTop: 5, flex: 1 }} onPress={() => onNavigation(video)}>
      {/* Video component */}
      <View>
        {/* Thumbnail */}
        <View>
          <Image
            style={styles.thumbnail}
            source={{ uri: video?.snippet.thumbnails.high.url }}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {timeVideo.current}
              </Text>
          </View>
        </View>
        {/* Title row */}
        <View style={styles.titleRow}>
          {channel ? (
            <Image
              style={styles.avatar}
              source={{ uri: channel.snippet.thumbnails.high.url }}
            />
          ) : (
            <Image style={styles.avatar} />
          )}
          <View style={styles.content}>
            <Text style={styles.titleContent} numberOfLines={2}>
              {video?.snippet.title}
            </Text>
            <Text style={styles.subContent}>
              {video?.snippet.channelTitle} - {viewString} - {dateString}
            </Text>
          </View>
          <Entypo name="dots-three-vertical" size={15} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  timeContainer: {
    paddingHorizontal: 5,
    height: 25,
    backgroundColor: "#00000099",
    position: "absolute",
    right: 5,
    bottom: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  time: {
    color: "white",
  },
  titleRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  titleContent: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subContent: {
    color: "#6C6C6C",
    fontSize: 12,
  },
});
