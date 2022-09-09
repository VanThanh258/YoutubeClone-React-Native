import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import  Constants  from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const HeaderSearch = (props) => {
  return (
    <View style={styles.container} >
        <TouchableOpacity onPress={props.onGoBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput style={styles.search} placeholder='Tìm kiếm trên Youtube'/>
        <TouchableOpacity style={styles.record}>
        <MaterialCommunityIcons name="microphone" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default HeaderSearch

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'space-between'
    },
    search:{
        flex:1,
        paddingVertical: 3,
        paddingHorizontal: 5,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
    record:{
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#DDDDDD',
        marginLeft: 5,
        alignItems:'center',
        justifyContent:'center'
    }
})