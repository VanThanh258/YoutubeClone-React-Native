import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import React, { useImperativeHandle } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { forwardRef } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const MAX_TRANSLATE_Y = -screenHeight;
const bottomSheetHeight = screenHeight - screenHeight / 3.5;

const BottomSheetDetail = forwardRef(
    (
        { title, avatar, nameChannel, likeVideo, view, day, month, year, desc },
        ref,
    ) => {
        const translateY = useSharedValue(0);

        const scrollTo = (destination) => {
            'worklet';
            translateY.value = withTiming(destination);
        };

        useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

        const context = useSharedValue({ y: 0 });
        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event) => {
                translateY.value = event.translationY + context.value.y;
                translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
            })
            .onEnd(() => {
                if (translateY.value > -bottomSheetHeight / 2) {
                    scrollTo(0);
                } else if (
                    translateY.value <
                    (-screenHeight - bottomSheetHeight) / 2
                ) {
                    scrollTo(MAX_TRANSLATE_Y);
                } else if (translateY.value < -bottomSheetHeight / 2) {
                    scrollTo(-bottomSheetHeight);
                } else if (
                    translateY.value >
                    (-screenHeight - bottomSheetHeight) / 2
                ) {
                    scrollTo(-bottomSheetHeight);
                }
            });

        const rBottomSheetStyle = useAnimatedStyle(() => {
            return {
                transform: [{ translateY: translateY.value }],
            };
        });

        const handleClose = () => {
            ref?.current?.scrollTo(0);
        };

        return (
            <Animated.View
                style={[styles.bottomSheetContainer, rBottomSheetStyle]}
            >
                <GestureDetector gesture={gesture}>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Nội dung mô tả
                        </Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </GestureDetector>
                <ScrollView style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.channel}>
                        <Image style={styles.avatar} source={{ uri: avatar }} />
                        <Text>{nameChannel}</Text>
                    </View>
                    <View style={styles.infoVideo}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {likeVideo}
                            </Text>
                            <Text>Lượt thích</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{view}</Text>
                            <Text>Lượt xem</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {day} tháng {month}
                            </Text>
                            <Text>{year}</Text>
                        </View>
                    </View>
                    <View style={styles.desc}>
                        <Text>{desc}</Text>
                    </View>
                </ScrollView>
            </Animated.View>
        );
    },
);

export default BottomSheetDetail;

const styles = StyleSheet.create({
    bottomSheetContainer: {
        backgroundColor: 'white',
        height: screenHeight,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: screenHeight,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        justifyContent: 'space-between',
        padding: 12,
    },
    content: {},
    title: {
        padding: 12,
        fontSize: 15,
        fontWeight: 'bold',
    },
    channel: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        marginRight: 10,
    },
    infoVideo: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    desc: {
        padding: 12,
    },
});
