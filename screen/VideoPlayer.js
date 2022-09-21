import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from "react-redux";
import WatchVideo from "../components/WatchVideo";
import InfoVideo from "../components/InfoVideo";
import { useRef } from "react";
import OptionBar from "../components/OptionBar";
import Channel from "../components/Channel";
import Comment from "../components/Comment";
import { useEffect,useState } from "react";
import { fetchRelatedVideo } from "../src/store/relatedVideoSilce";
import VideoCard from "../components/VideoCard";
const VideoPlayer = ({ navigation }) => {
  const dispatch = useDispatch();
  const video1 = useSelector((state) => state.video);
  const { videoId, listVideo } = video1;
  const video = listVideo.find((item) => item.id === videoId);
  const channel1 = useSelector((state) => state.channel);
  const { listChannel, channelId } = channel1;
  const channel = listChannel.find((item) => item.id === channelId);
  const listRelatedVideo = useSelector(
    (state) => state.relatedVideo.listRelatedVideo
  );

  let timeString = useRef("");
  let viewString = useRef("");
  let likeString = useRef("");
  let subString = useRef("");
  let commentString = useRef("");

  useEffect(() => {
    dispatch(fetchRelatedVideo(videoId));
  }, []);

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
  };

  const showView = (view) => {
    if (view > 1000000) {
      viewString = (view / 1000000).toFixed(1) + " Tr" + " lượt xem";
    } else if (view > 1000) {
      viewString = (view / 1000).toFixed(0) + " N" + " lượt xem";
    }
    return viewString;
  };

  const showLike = (like) => {
    if (like > 1000000) {
      likeString = (like / 1000000).toFixed(0) + " Tr";
    } else if (like > 10000) {
      likeString = (like / 10000).toFixed(0) + " N";
    } else if (like > 1000) {
      likeString = (like / 1000).toFixed(1) + " N";
    }
    return likeString;
  };

  const showSubscribe = (sub) => {
    if (sub > 10000000) {
      subString = (sub / 1000000).toFixed(1) + " Tr subscribe";
    } else if (sub > 1000000) {
      subString = (sub / 1000000).toFixed(2) + " Tr subscribe";
    } else if (sub > 1000) {
      subString = (sub / 1000).toFixed(0) + " N subscribe";
    }
    return subString;
  };

  const showComment = (comment) => {
    if (comment > 1000000) {
      commentString = (comment / 1000000).toFixed(1) + " Tr";
    } else if (comment > 1000) {
      commentString = (comment / 1000).toFixed(0) + " N";
    } else {
      commentString = comment;
    }
    return commentString;
  };

  const renderItem = ({ item }) => {
    showTime(item.snippet.publishedAt);
    return (
      <VideoCard
        thumbnail={item.snippet.thumbnails.high.url}
        title={item.snippet.title}
        channelTitle={item.snippet.channelTitle}
        time={timeString}
        channelId={item.snippet.channelId}
      />
    );
  };

  viewString = showView(video.statistics.viewCount);
  timeString = showTime(video.snippet.publishedAt);
  likeString = showLike(video.statistics.likeCount);
  commentString = showComment(video.statistics.commentCount);
  subString = showSubscribe(channel.statistics.subscriberCount);

  return (
    <View>
      <WatchVideo videoId={videoId} />
      {/* <ScrollView>
        <InfoVideo
          title={video.snippet.title}
          view={viewString}
          time={timeString}
        />
        <OptionBar like={likeString} />
        <Channel
          avatar={channel.snippet.thumbnails.high.url}
          title={channel.snippet.localized.title}
          subscribe={subString}
        />
        <Comment commentCount={commentString} />
        {
        listRelatedVideo.map((item) => {
          showTime(item.snippet.publishedAt);
          return (
            <VideoCard
              thumbnail={item.snippet.thumbnails.high.url}
              title={item.snippet.title}
              channelTitle={item.snippet.channelTitle}
              time={timeString}
              channelId={item.snippet.channelId}
            />
          );
        })
        }
      </ScrollView> */}
      <View style={{height: '70%'}}>
      <FlatList
      data={listRelatedVideo}
      keyExtractor={item => item.id.videoId}
      ListHeaderComponent={() => (
        <>
        <InfoVideo
          title={video.snippet.title}
          view={viewString}
          time={timeString}
        />
        <OptionBar like={likeString} />
        <Channel
          avatar={channel.snippet.thumbnails.high.url}
          title={channel.snippet.localized.title}
          subscribe={subString}
        />
        <Comment commentCount={commentString} />
        </>
      )}
      renderItem={renderItem}
      />
      </View>
    </View>
  );
};

export default VideoPlayer;
