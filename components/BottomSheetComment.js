import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useImperativeHandle } from "react";
import { AntDesign } from "@expo/vector-icons";
import UserComment from "./UserComment";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { forwardRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const screenHeight = Dimensions.get("window").height;

const BottomSheetComment = forwardRef((props, ref) => {
  const listComment = useSelector((state) => state.comment.listComment);

  let timeString = useRef("");
  let likeCount = useRef("");

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

  const showLike = (like) => {
    if (like == 0) {
      likeCount = "";
    } else {
      likeCount = like;
    }
    return likeCount;
  };

  const translateY = useSharedValue(0);

  const scrollTo = (destination) => {
    "worklet";
    translateY.value = withTiming(destination);
  };

  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleClose = () => {
    ref?.current?.scrollTo(0);
  };

  const renderItem = ({ item }) => {
    timeString = showTime(item.snippet.topLevelComment.snippet.publishedAt);
    likeCount = showLike(item.snippet.topLevelComment.snippet.likeCount);
    return (
      <UserComment
        avatar={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
        userName={item.snippet.topLevelComment.snippet.authorDisplayName}
        time={timeString}
        comment={item.snippet.topLevelComment.snippet.textOriginal}
        like={likeCount}
      />
    );
  };

  return (
    <Animated.View style={[styles.container, rBottomSheetStyle]}>
    {/* <View style={styles.container}> */}
      <View style={styles.header}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Bình luận</Text>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.comment}>
        <FontAwesome name="user-circle-o" size={35} color="black" />
        <TextInput
          style={{ width: "85%" }}
          placeholder="Mời bạn nhập bình luận"
        />
      </View>
      <FlatList
        data={listComment}
        renderItem={renderItem}
        keyExtractor={(item) => item.snippet.id}
      />
    {/* </View> */}
    </Animated.View>
  );
});

export default BottomSheetComment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: screenHeight,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: screenHeight,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    justifyContent: "space-between",
    padding: 12,
  },
  comment: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
