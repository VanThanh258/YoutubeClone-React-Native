import { View, Text } from 'react-native';
import React from 'react';
import Header from '../components/Header';

const Subcription = ({ navigation }) => {
    const handleNavigation = () => {
        navigation.navigate('Search');
    };
    return (
        <View>
            <Header onNavigation={handleNavigation} />
            <Text>Subcription</Text>
        </View>
    );
};

export default Subcription;
