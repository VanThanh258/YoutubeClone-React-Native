import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Comment = ({
  commentCount
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Comment {commentCount}</Text>
        <Image source={require('../images/imageCard/IconComment.png')}/>
      </View>
      <View style={styles.bot}>
        <View style={{width: '10%'}}>
        <Image style={styles.avatar}/>
        </View>
        <View style={{width: '90%'}}>
            <Text>জাযাকাল্লাহ ভাইয়া আপনার এই মেহনত আল্লাহ কবুল করুক সম্ভব হলে প্রতিদিন ১টা করে porbo দিয়েন</Text>    
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