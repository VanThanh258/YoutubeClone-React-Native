import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
const InfoVideo = ({
  onMoreInfomation,
  title,
  view,
  time
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onMoreInfomation}>
      <View style={styles.left}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{view} - {time}</Text>
      </View>
      <View>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </View>
    </TouchableOpacity>
  )
}

export default InfoVideo

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 10,
        paddingHorizontal: 12
    },
    left:{
        width: '90%'
    },
    title:{
      fontWeight: 'bold',
      fontSize: 16,
    },
    desc:{
      fontSize: 12,
      color:'#6C6C6C'
    }
})