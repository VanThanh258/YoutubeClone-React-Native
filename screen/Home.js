import { View, FlatList, StyleSheet, StatusBar, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VideoCard from '../components/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import SubHeader from '../components/SubHeader';
import Constants from 'expo-constants';
import {
    fetchListVideoPopular,
    fetchVideoByTopic,
    videoSliceAction,
} from '../src/store/videoSlice';
import { channelSliceAction } from '../src/store/channelSlice';
import { fetchVideoCategories } from '../src/store/videoCategoriesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from 'react';
import { videoIdHistorySliceAction } from '../src/store/videoIdHistorySlice';

const headerHeight = Constants.statusBarHeight + 80;

const Home = ({ navigation }) => {
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();
    const listVideoMostPopular = useSelector(
        (state) => state.video.listVideoMostPopular,
    );
    const listVideoCategories = useSelector(
        (state) => state.videoCategories.listVideoCategories,
    );
    const listVideoByTopic = useSelector(
        (state) => state.video.listVideoByTopic,
    );
    const listVideoIdHistory = useSelector(
        (state) => state.videoIdHistory.listVideoIdHistory,
    );

    useEffect(() => {
        dispatch(fetchListVideoPopular());
    }, []);

    useEffect(() => {
        dispatch(fetchVideoCategories());
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('videoIdHistory').then((value) => {
            if (value) {
                const list = JSON.parse(value);
                const action = videoIdHistorySliceAction.saveListIdVideo(list);
                dispatch(action);
            }
        });
    }, []);

    const renderItemListVideo = ({ item }) => {
        return (
            <VideoCard
                onNavigation={handleNavigationToVideoPlayer}
                channelId={item.snippet.channelId}
                videoId={item.id}
            />
        );
    };

    const renderItemTopicVideo = ({ item }) => {
        return (
            <VideoCard
                onNavigation={handleNavigationToVideoPlayer}
                channelId={item.snippet.channelId}
                videoId={item.id.videoId}
            />
        );
    };

    const handleNavigationToVideoPlayer = async (item) => {
        let updateListVideoId = [];
        const videoId = listVideoIdHistory.find((item1) => item1 === item.id);
        if (videoId) {
            updateListVideoId = listVideoIdHistory;
        } else {
            updateListVideoId = [...listVideoIdHistory, item.id];
        }
        try {
            await AsyncStorage.setItem(
                'videoIdHistory',
                JSON.stringify(updateListVideoId),
            );
            const action =
                videoIdHistorySliceAction.saveListIdVideo(updateListVideoId);
            dispatch(action);
            const actionUpdateVideoId = videoSliceAction.updateVideoId(item.id);
            dispatch(actionUpdateVideoId);
            const actionUpdateChannelId = channelSliceAction.updateChannelId(
                item.snippet.channelId,
            );
            dispatch(actionUpdateChannelId);
            navigation.navigate('VideoPlayer');
        } catch (e) {
            console.log(e);
        }
    };

    const handleNavigationToSubSearch = () => {
        navigation.navigate('SubSearch');
    };

    const handleFilterVideo = (item) => {
        setShow(false);
        dispatch(fetchVideoByTopic(item));
    };

    const handleShowAllVideo = () => {
        setShow(true);
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
                <Header onNavigation={handleNavigationToSubSearch} />
                <SubHeader
                    listVideoCategories={listVideoCategories}
                    onFilterVideo={handleFilterVideo}
                    onShowAllVideo={handleShowAllVideo}
                />
            </Animated.View>
            <View>
                {show === true ? (
                    <FlatList
                        style={{ paddingTop: headerHeight }}
                        data={listVideoMostPopular}
                        renderItem={renderItemListVideo}
                        keyExtractor={(item) => item.id}
                        onScroll={handleScoll}
                        scrollEventThrottle={16}
                    />
                ) : (
                    <FlatList
                        style={{ paddingTop: headerHeight }}
                        data={listVideoByTopic}
                        renderItem={renderItemTopicVideo}
                        keyExtractor={(item) => item.id.videoId}
                        onScroll={handleScoll}
                        scrollEventThrottle={16}
                    />
                )}
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
        position: 'absolute',
        zIndex: 1000,
        height: headerHeight,
        elevation: 4,
    },
});
