import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { fetchChannel } from '../src/store/channelSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChannelCard = ({ channelId }) => {
    const dispatch = useDispatch();
    const listChannel = useSelector((state) => state.channel.listChannel);
    const channel = listChannel.find((item) => item.id === channelId);

    useEffect(() => {
        dispatch(fetchChannel(channelId));
    }, []);

    const showSubscribe = (sub) => {
        let subString;
        if (sub > 10000000) {
            subString = (sub / 1000000).toFixed(1) + ' Tr subscribe';
        } else if (sub > 1000000) {
            subString = (sub / 1000000).toFixed(2) + ' Tr subscribe';
        } else if (sub > 1000) {
            subString = (sub / 1000).toFixed(0) + ' N subscribe';
        }
        return subString;
    };

    const subcriber = showSubscribe(channel?.statistics.subscriberCount);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image
                    style={styles.avatar}
                    source={{ uri: channel?.snippet.thumbnails.high.url }}
                />
            </View>
            <View style={styles.right}>
                <View style={styles.contentRight}>
                    <Text style={styles.title}>{channel?.snippet.title}</Text>
                    <Text style={{ marginBottom: -3 }}>{subcriber}</Text>
                    <Text>{channel?.statistics.videoCount} video</Text>
                    <View style={styles.subcribe}>
                        <Text
                            style={{
                                marginRight: 20,
                                color: 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            Đăng ký
                        </Text>
                        <EvilIcons name="bell" size={24} color="black" />
                    </View>
                </View>
                <Entypo name="dots-three-vertical" size={18} color="black" />
            </View>
        </View>
    );
};

export default ChannelCard;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 5,
    },
    left: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    right: {
        width: '50%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    contentRight: {
        width: '90%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 3,
    },
    subcribe: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: 'center',
    },
});
