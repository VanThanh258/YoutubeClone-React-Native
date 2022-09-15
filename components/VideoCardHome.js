import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const VideoCardHome = (props) => {
  
  return (
    <Pressable style={{marginTop:5,}} onPress={props.onNavigation}>
      {/* Video component */}
      <View>
        {/* Thumbnail */}
          <View>
            <Image style={styles.thumbnail} source={{uri: props.thumbnail}}/>
            {/* <View style={styles.timeContainer}>
              <Text style={styles.time}>15:23</Text>
            </View> */}
          </View>
        {/* Title row */}
          <View style={styles.titleRow}>
            <Image style={styles.avatar} source={require('../images/imageCard/Thum.png')}/>
            <View style={styles.content}>
              <Text style={styles.titleContent} numberOfLines={2}>{props.title}</Text>
              <Text style={styles.subContent}>{props.channelTitle} - {props.view} - {props.time}</Text>
            </View>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </View>
      </View>
    </Pressable>
  )
}

export default VideoCardHome

const styles = StyleSheet.create({
    thumbnail:{
      width: '100%',
      aspectRatio: 16/9,
    },
    timeContainer:{
      width: 50,
      height: 25,
      backgroundColor: '#00000099',
      position:'absolute',
      right: 5,
      bottom: 5, 
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 5   
    },
    time:{
      color:'white'
    },
    titleRow:{
      flexDirection: 'row',
      paddingVertical: 14,
      paddingHorizontal: 12,
      backgroundColor:'white'
    },
    avatar:{
      width: 36,
      height: 36,
      borderRadius: 36/2
    },
    content:{
      flex: 1,
      marginLeft: 12,
    },
    titleContent:{
      fontSize: 14,
      fontWeight:'bold'
    },
    subContent:{
      color:'#6C6C6C'
    }
})