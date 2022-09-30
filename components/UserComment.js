import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const UserComment = ({ avatar, userName, time, comment, like }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <View style={{ marginRight: 10 }}>
                    <Image style={styles.avatar} source={{ uri: avatar }} />
                </View>
                <View style={{ width: '90%' }}>
                    <Text>
                        {userName} - {time}
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>{comment}</Text>
                    <View style={styles.option}>
                        <AntDesign name="like2" size={15} color="black" />
                        <Text>{like}</Text>
                        <AntDesign
                            style={{ marginLeft: 50 }}
                            name="dislike2"
                            size={15}
                            color="black"
                        />
                        <MaterialIcons
                            style={{ marginLeft: 50 }}
                            name="comment"
                            size={15}
                            color="black"
                        />
                    </View>
                </View>
            </View>
            <View>
                <Entypo name="dots-three-vertical" size={18} color="gray" />
            </View>
        </View>
    );
};

export default UserComment;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    left: {
        flexDirection: 'row',
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        marginTop: 5,
    },
    option: {
        flexDirection: 'row',
        marginTop: 10,
    },
});
