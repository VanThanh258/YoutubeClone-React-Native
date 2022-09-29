import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Channel = ({
  title,
  subscribe,
  avatar
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', width:'70%', alignItems:'center'}}>
        <Image style={styles.img} source={{uri: avatar}}/>       
      <View style={{marginLeft: 10}}>
        <Text style={styles.nameChannel}>{title}</Text>
        <Text style={styles.subcribe}>{subscribe}</Text>
      </View>
      </View>
      <View>
        <Text style={styles.sub}>SUBCRIBE</Text>
      </View>
    </View>
  )
}

export default Channel

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding: 12,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 12
    },
    img:{
        width: 36,
        height: 36,
        borderRadius: 36/2
    },
    middle:{
        
    },
    nameChannel:{
        fontWeight: 'bold',
        fontSize: 16,
        alignContent:'flex-start'
    },
    subcribe:{
        fontSize: 12,
        color: '#6C6C6C'
    },
    sub:{
        color:'#FF0000'
    }
})