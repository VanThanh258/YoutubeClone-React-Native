import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Comment = ({
  commentCount,
  commentPublic,
  avatar
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Comment {commentCount}</Text>
        <Image source={require('../images/imageCard/IconComment.png')}/>
      </View>
      <View style={styles.bot}>
        <View style={{width: '10%'}}>
        <Image style={styles.avatar} source={{uri: avatar}}/>
        </View>
        <View style={{width: '90%'}}>
            <Text numberOfLines={1}>{commentPublic}</Text>    
        </View>
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 12,
    },
    top:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bot:{
        flexDirection:'row',
    },
    avatar:{
        width: 20,
        height: 20,
        backgroundColor:'green',
        borderRadius: 10,
        
    },

})