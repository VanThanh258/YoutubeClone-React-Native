import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const WatchVideo = (props) => {
  return (
    <View>
      <YoutubePlayer
      width={screenWidth}
      height={screenHeight/3}
      play={true}
      videoId={props.videoId}
      />
    </View>
  )
}

export default WatchVideo;

const styles = StyleSheet.create({
    
})