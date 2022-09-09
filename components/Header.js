import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import  Constants  from 'expo-constants'
const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
      <Image style={styles.logo} source={require('../images/imageHeader/Logo.png')}/>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity>
        <Image style={styles.image} source={require('../images/imageHeader/SlideShow.png')}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={styles.image} source={require('../images/imageHeader/Bell.png')}/>
        </TouchableOpacity>
        <Pressable onPress={props.onNavigation}>
        <Image style={styles.image} source={require('../images/imageHeader/Search.png')}/>
        </Pressable>
        <TouchableOpacity>
        <Image style={styles.image} source={require('../images/imageHeader/User.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems:'center', 
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        justifyContent:'space-between',
    },
    logo:{
        width: 90,
        height: 20
    },  
    headerRight:{
        flexDirection: 'row'
    },
    image:{
        marginLeft: 20,
    }
})