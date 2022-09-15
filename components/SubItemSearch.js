import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 

const SubItemSearch = (props) => {
  return (
    <Pressable style={styles.container} onPress={props.onNavigationSearch}>
      <Feather name="clock" size={24} color="black" />
      <View style={styles.content}>
      <Text style={styles.text}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={props.onSetText}>
      <Feather name="arrow-up-left" size={24} color="black" />
      </TouchableOpacity>
    </Pressable>
  )
}

export default SubItemSearch

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 10,
        alignItems:'center',
        marginBottom: 20,
    },
    content:{
      flex: 0.9,
      flexDirection: 'row',
      justifyContent:'flex-start'
    },
    text:{
      fontWeight:'bold',
      fontSize: 15,
    }
})