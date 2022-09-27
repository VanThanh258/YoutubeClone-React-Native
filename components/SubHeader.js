import { View, Text, Image, StyleSheet,Dimensions, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';

const screenWidth = Dimensions.get('window').width;
const SubHeader = ({
  listVideoCategories,
  onFilterVideo,
  onShowAllVideo
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#ECECEC')
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
          <TouchableOpacity 
          style={styles.contentRight}
          onPress = {onShowAllVideo}
          >
            <Text>Most Popular</Text>
          </TouchableOpacity>
          {
            listVideoCategories.map((item) => {
              return (
                <TouchableOpacity
                key={item.id}
                style={styles.contentRight}
                onPress={() => onFilterVideo(item.id)}
                >
                  <Text>{item.snippet.title}</Text>
                </TouchableOpacity>
              )
            })
          }
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