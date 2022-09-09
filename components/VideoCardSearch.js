import { View, Text,StyleSheet,Dimensions,Image, Pressable } from 'react-native'
import React from 'react'
const width = Dimensions.get('window').width;
const VideoCardSearch = () => {
  return (
    <Pressable style={styles.container}>
        <Image style={styles.thumb} source={require('../images/imageCard/Thum.png')} />
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={3}>Compiltation | Everything Belongs to Allah 33 Mins | omar...Compiltation | Everything Belongs to Allah 33 Mins | omar</Text>
            <Text style={styles.channel}>Omar & Hana - Islamic </Text>
            <Text style={styles.view}>5.5M views</Text>
        </View>
    </Pressable>
  )
}

export default VideoCardSearch

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop: 13,
        paddingHorizontal: 10,
        alignItems:'center'
    },
    thumb:{
        width: '45%',
        height: 90,
    },
    content:{
        width: width/2,
        marginLeft: 10,
    },
    title:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    channel:{
        fontSize: 12,
    },
    view:{
        fontSize: 12
    }

})