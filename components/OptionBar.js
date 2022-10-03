import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
} from '@expo/vector-icons';
import { useState } from 'react';

const OptionBar = ({ like }) => {
    const [likeVideo, setLikeVideo] = useState(false);

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.allIcon}
                onPress={() => setLikeVideo(!likeVideo)}
            >
                {likeVideo === false ? (
                    <AntDesign name="like2" size={24} color="black" />
                ) : (
                    <AntDesign name="like1" size={24} color="black" />
                )}
                <Text>{like}</Text>
            </Pressable>
            <TouchableOpacity style={styles.allIcon}>
                <AntDesign name="dislike2" size={24} color="black" />
                <Text>Không thích</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.allIcon}>
                <Ionicons name="arrow-redo-outline" size={24} color="black" />
                <Text>Chia sẻ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.allIcon}>
                <MaterialCommunityIcons
                    name="tray-arrow-down"
                    size={24}
                    color="black"
                />
                <Text>Tải xuống</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.allIcon}>
                <MaterialIcons name="my-library-add" size={24} color="black" />
                <Text>Lưu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OptionBar;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        marginTop: 28,
        marginBottom: 12,
        justifyContent: 'space-between',
    },
    allIcon: {
        alignItems: 'center',
    },
});
