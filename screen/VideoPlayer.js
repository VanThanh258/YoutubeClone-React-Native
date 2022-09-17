import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useSelector } from 'react-redux'
import WatchVideo from '../components/WatchVideo'
const VideoPlayer = ({navigation}) => {
  const video = useSelector(state => state.video)
  const {videoId} = video
  return (
    <View>
      <WatchVideo
       videoId={videoId}
       />
    </View>
  )
}

export default VideoPlayer