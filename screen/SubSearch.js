import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import SubItemSearch from '../components/SubItemSearch';
import HeaderSubSearch from '../components/HeaderSubSearch';
import { useEffect } from 'react';
import recommendApi from '../src/api/recommendApi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRecommend,
    recommendSliceAction,
} from '../src/store/recommendSlice';
import { searchSliceAction } from '../src/store/searchSlice';

const SubSearch = ({ navigation }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const listWord = useSelector((state) => state.recommend.listWord);

    useEffect(() => {
        dispatch(fetchRecommend(text));
    }, [text]);

    const handleNavigationSearch = (item) => {
        setText(item);
        const action = searchSliceAction.updateKeyWord(item);
        dispatch(action);
        navigation.push('Search');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleChangeText = (text) => {
        setText(text);
    };

    const handleSetText = (item) => {
        setText(item);
    };

    const handleSearchVideo = () => {
        const action = searchSliceAction.updateKeyWord(text);
        dispatch(action);
        navigation.push('Search');
    };

    return (
        <View style={styles.container}>
            <HeaderSubSearch
                onGoBack={handleGoBack}
                onChangeText={handleChangeText}
                onSearch={handleSearchVideo}
                value={text}
            />
            <ScrollView>
                {listWord.map((item, index) => {
                    return (
                        <SubItemSearch
                            key={index}
                            onNavigationSearch={() =>
                                handleNavigationSearch(item)
                            }
                            onSetText={() => handleSetText(item)}
                            text={item}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default SubSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
