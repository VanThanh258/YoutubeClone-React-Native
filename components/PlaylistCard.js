import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '../src/store/playlistSlice';

const PlaylistCard = ({ thumbnails, channelTitle, playlistId, title }) => {
    const dispatch = useDispatch();
    const listPlaylist = useSelector((state) => state.playlist.listPlaylist);
    const playlist = listPlaylist.find(
        (item) => item.items[0].snippet.playlistId === playlistId,
    );

    useEffect(() => {
        dispatch(fetchPlaylist(playlistId));
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.thumbnail} source={{ uri: thumbnails }} />
                <View style={styles.subThumbnail} />
                <Text style={styles.totalVideo}>
                    {playlist?.pageInfo.totalResults}
                </Text>
                <MaterialIcons
                    style={styles.icon}
                    name="playlist-play"
                    size={40}
                    color="white"
                />
            </View>
            <View style={styles.content}>
                <View style={{ width: '95%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                        {title}
                    </Text>
                    <Text>{channelTitle}</Text>
                    <Text>{playlist?.pageInfo.totalResults} video</Text>
                </View>
                <Entypo name="dots-three-vertical" size={15} color="black" />
            </View>
        </View>
    );
};

export default PlaylistCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 16 / 9,
        position: 'relative',
    },
    subThumbnail: {
        width: '50%',
        height: '100%',
        opacity: 0.2,
        backgroundColor: 'black',
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalVideo: {
        position: 'absolute',
        top: '35%',
        right: '20%',
        fontWeight: 'bold',
        color: 'white',
    },
    icon: {
        position: 'absolute',
        top: '42%',
        right: '17%',
    },
    content: {
        paddingHorizontal: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
