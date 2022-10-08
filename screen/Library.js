import { View, Text, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoHistoryCard from '../components/VideoHistoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { videoSliceAction } from '../src/store/videoSlice';
import { channelSliceAction } from '../src/store/channelSlice';

const Library = ({ navigation }) => {
    const listVideoId = useSelector(
        (state) => state.videoIdHistory.listVideoIdHistory,
    );

    const handleNavigation = () => {
        navigation.navigate('Search');
    };

    const handleRemove = async () => {
        try {
            await AsyncStorage.removeItem('videoIdHistory');
        } catch (e) {
            console.log(e);
        }
    };

    const handleNavigationtoVideoPlayer = (item) => {
        
    };
    return (
        <View>
            <Header onNavigation={handleNavigation} />
            <Text style={{ paddingHorizontal: 10, fontWeight: 'bold' }}>
                Video đã xem
            </Text>
            <ScrollView horizontal style={{ paddingHorizontal: 8 }}>
                {listVideoId.map((item) => {
                    return (
                        <VideoHistoryCard
                            onNavigation={handleNavigationtoVideoPlayer}
                            key={item}
                            videoId={item}
                        />
                    );
                })}
            </ScrollView>
            <TouchableOpacity style={{ margin: 10 }}>
                <Button title="Delete History" onPress={handleRemove} />
            </TouchableOpacity>
        </View>
    );
};

export default Library;
