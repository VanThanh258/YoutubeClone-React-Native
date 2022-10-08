import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannel } from '../src/store/channelSlice';
import { fetchVideo } from '../src/store/videoSlice';
import { useRef } from 'react';
import {
    showView,
    showDate,
    YTDurationToSeconds,
    showTimeVideo,
} from '../utils/video';

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
        dispatch(fetchVideo(videoId));
    }, []);

    const timeVideo = useRef('');

    const viewString = showView(video?.statistics.viewCount);
    const dateString = showDate(video?.snippet.publishedAt);
    if (video) {
        const time = YTDurationToSeconds(video.contentDetails.duration);
        timeVideo.current = showTimeVideo(time);
    }

    return (
        <Pressable
            style={{ marginTop: 5, flex: 1 }}
            onPress={() => onNavigation(video)}
        >
            {/* Video component */}
            <View>
                {/* Thumbnail */}
                <View>
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: video?.snippet.thumbnails.high.url }}
                    />
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{timeVideo.current}</Text>
                    </View>
                </View>
                {/* Title row */}
                <View style={styles.titleRow}>
                    {channel ? (
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: channel.snippet.thumbnails.high.url,
                            }}
                        />
                    ) : (
                        <Image style={styles.avatar} />
                    )}
                    <View style={styles.content}>
                        <Text style={styles.titleContent} numberOfLines={2}>
                            {video?.snippet.title}
                        </Text>
                        <Text style={styles.subContent}>
                            {video?.snippet.channelTitle} - {viewString} -{' '}
                            {dateString}
                        </Text>
                    </View>
                    <Entypo
                        name="dots-three-vertical"
                        size={15}
                        color="black"
                    />
                </View>
            </View>
        </Pressable>
    );
};

export default VideoCard;

const styles = StyleSheet.create({
    thumbnail: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    timeContainer: {
        paddingHorizontal: 5,
        height: 25,
        backgroundColor: '#00000099',
        position: 'absolute',
        right: 5,
        bottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    time: {
        color: 'white',
    },
    titleRow: {
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: 'white',
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
        fontWeight: 'bold',
    },
    subContent: {
        color: '#6C6C6C',
        fontSize: 12,
    },
});
