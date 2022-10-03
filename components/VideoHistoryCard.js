import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideo } from '../src/store/videoSlice';

const VideoHistoryCard = ({ videoId, onNavigation }) => {
    const dispatch = useDispatch();
    const listVideo = useSelector((state) => state.video.listVideo);
    const video = listVideo.find((item) => item.id === videoId);

    useEffect(() => {
        dispatch(fetchVideo(videoId));
    }, []);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onNavigation(video)}
        >
            <Image
                style={styles.image}
                source={{ uri: video?.snippet.thumbnails.high.url }}
            />
            <View style={{ width: '100%' }}>
                <Text style={{ fontWeight: 'bold' }} numberOfLines={2}>
                    {video?.snippet.title}
                </Text>
                <Text numberOfLines={1}>{video?.snippet.channelTitle}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default VideoHistoryCard;

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        width: 150,
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
});
