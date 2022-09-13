import { View, Text, Image, StyleSheet,Dimensions, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
const screenWidth = Dimensions.get('window').width;
const SubHeader = () => {
  return (
    <ScrollView 
    horizontal
    showsHorizontalScrollIndicator={false}
    >
    <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.explore}>
            <Image source={require('../images/imageHeader/Explore.png')}/>
            <Text style={{marginTop: -3, fontWeight: 'bold'}}>Explore</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Trò chơi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Âm nhạc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Trực tiếp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Danh sách kết hợp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Chương trình nấu ăn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Thể dục</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentRight}>
            <Text>Bóng đá</Text>
          </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  )
}

export default SubHeader

const styles = StyleSheet.create({
    container:{
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'white'
    },
    left:{
      width: screenWidth/4,
      borderRightWidth: 0.5,
      borderColor: 'gray',
      marginVertical: 5,

    },
    explore:{
      width: 89,
      height: 32,
      backgroundColor:'#ECECEC',
      borderRadius: 4,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    right:{
      flexDirection:'row',
      paddingLeft: 14
    },
    contentRight:{
      backgroundColor:'#ECECEC',
      borderRadius: 24,
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      justifyContent:'center',
      marginRight: 5,
    }
})