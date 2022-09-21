import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
const OptionBar = ({
    like
}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.allIcon}>
            <SimpleLineIcons name="like" size={24} color="black" />
            <Text>{like}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allIcon}>
            <SimpleLineIcons name="dislike" size={24} color="black" />
            <Text>Không thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allIcon}>
            <Ionicons name="arrow-redo-outline" size={24} color="black" />
            <Text>Chia sẻ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allIcon}>
            <MaterialCommunityIcons name="tray-arrow-down" size={24} color="black" />
            <Text>Tải xuống</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.allIcon}>
            <MaterialIcons name="my-library-add" size={24} color="black" />
            <Text>Lưu</Text>
        </TouchableOpacity>
    </View>
  )
}

export default OptionBar

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 12,
        flexDirection: 'row',
        marginTop: 28, 
        marginBottom: 12,
        justifyContent:'space-between'
    },
    allIcon:{
        alignItems:'center'
    }
})