import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useEffect, useState } from 'react';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const WatchVideo = ({ videoId }) => {
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsPlay(true);
        }, 500);
    }, []);

    if (!isPlay) return null;

    return (
        <View>
            <YoutubePlayer
                width={screenWidth}
                height={screenHeight / 3.5}
                play={true}
                videoId={videoId}
            />
        </View>
    );
};

export default WatchVideo;
