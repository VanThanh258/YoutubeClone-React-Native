import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import  Constants  from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const HeaderSubSearch = (props) => {
  return (
    <View style={styles.container} >
        <TouchableOpacity onPress={props.onGoBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput 
        value={props.value}
        autoFocus={true}
        style={styles.search} 
        placeholder='Tìm kiếm trên Youtube' 
        onChangeText={props.onChangeText} 
        onSubmitEditing={props.onSearch}/>
        <TouchableOpacity style={styles.record} >
        <FontAwesome name="microphone" size={22} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default HeaderSubSearch

const styles = StyleSheet.create({
    container:{
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