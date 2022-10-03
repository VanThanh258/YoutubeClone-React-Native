import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ onNavigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    style={styles.logo}
                    source={require('../images/imageHeader/Logo.png')}
                />
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity>
                    <Image
                        style={styles.image}
                        source={require('../images/imageHeader/SlideShow.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.image}
                        source={require('../images/imageHeader/Bell.png')}
                    />
                </TouchableOpacity>
                <Pressable onPress={onNavigation}>
                    <Image
                        style={styles.image}
                        source={require('../images/imageHeader/Search.png')}
                    />
                </Pressable>
                <TouchableOpacity>
                    <FontAwesome
                        style={styles.image}
                        name="user-circle"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        justifyContent: 'space-between',
        position: 'relative',
    },
    logo: {
        width: 95,
        height: 20,
    },
    headerRight: {
        flexDirection: 'row',
    },
    image: {
        marginLeft: 20,
    },
});
