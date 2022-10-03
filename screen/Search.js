import { View, StyleSheet } from 'react-native';
import React from 'react';
import HeaderSearch from '../components/HeaderSearch';
import VideoCard from '../components/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoSearch } from '../src/store/searchSlice';
import { videoSliceAction } from '../src/store/videoSlice';
import { channelSliceAction } from '../src/store/channelSlice';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ChannelCard from '../components/ChannelCard';
import PlaylistCard from '../components/PlaylistCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { videoIdHistorySliceAction } from '../src/store/videoIdHistorySlice';

const Search = ({ navigation }) => {
    const dispatch = useDispatch();
    const keyWord = useSelector((state) => state.search.keyWord);
    const listVideoSearch = useSelector(
        (state) => state.search.listVideoSearch,
    );
    const listSearchChannel = useSelector(
        (state) => state.search.listSearchChannel,
    );
    const listSearchPlaylist = useSelector(
        (state) => state.search.listSearchPlaylist,
    );
    const listVideoIdHistory = useSelector(
        (state) => state.videoIdHistory.listVideoIdHistory,
    );

    useEffect(() => {
        dispatch(fetchVideoSearch(keyWord));
    }, []);

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

    const handleNavigation = () => {
        navigation.popToTop();
    };

    const handleFocus = () => {
        navigation.pop(1);
    };

    return (
        <View>
            <HeaderSearch
                onGoBack={handleNavigation}
                value={keyWord}
                onFocus={handleFocus}
            />
            <View style={{ marginBottom: 100 }}>
                <ScrollView>
                    {listSearchChannel.map((item) => {
                        return (
                            <ChannelCard
                                key={item.id.channelId}
                                channelId={item.id.channelId}
                            />
                        );
                    })}
                    {listSearchPlaylist.map((item) => {
                        return (
                            <PlaylistCard
                                key={item.id.playlistId}
                                thumbnails={item.snippet.thumbnails.high.url}
                                channelTitle={item.snippet.channelTitle}
                                title={item.snippet.title}
                                playlistId={item.id.playlistId}
                            />
                        );
                    })}
                    {listVideoSearch.map((item) => {
                        return (
                            <VideoCard
                                key={item.id.videoId}
                                onNavigation={handleNavigationToVideoPlayer}
                                channelId={item.snippet.channelId}
                                videoId={item.id.videoId}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
});
