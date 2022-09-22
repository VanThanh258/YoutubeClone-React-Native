import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;
const bottomSheetHeight = screenHeight - screenHeight / 3.4;
const BottomSheetDetail = ({ 
  onShowBottomSheet,
  title,
  avatar,
  nameChannel,
  likeVideo,
  view,
  day,
  month,
  year,
  desc
}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 15, fontWeight:'bold'}}>Nội dung mô tả</Text>
        <TouchableOpacity onPress={onShowBottomSheet}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.channel}>
          <Image style={styles.avatar} source={{uri: avatar}}/>
          <Text>{nameChannel}</Text>
        </View>
        <View style={styles.infoVideo}>
          <View style={{alignItems:'center'}}> 
            <Text style={{fontWeight:'bold'}}>{likeVideo}</Text>
            <Text>Lượt thích</Text>
          </View> 
          <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold'}}>{view}</Text>
            <Text>Lượt xem</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold'}}>{day} tháng {month}</Text>
            <Text>{year}</Text>
          </View>
        </View>
        <View style={styles.desc}>
          <Text>{desc}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BottomSheetDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: bottomSheetHeight,
  },
  header:{
    flexDirection:'row',
    borderBottomWidth: 0.5,
    borderBottomColor:'gray',
    justifyContent:'space-between',
    padding: 12
  },
  content:{
    
  },
  title:{
    padding: 12,
    fontSize: 15,
    fontWeight:'bold'
  },
  channel:{
    paddingHorizontal: 12,
    flexDirection:'row',
    alignItems:'center'
  },
  avatar:{
    width: 36,
    height: 36,
    borderRadius: 36/2,
    marginRight: 10
  },
  infoVideo:{
    padding: 12,
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor:'gray'
  },
  desc:{
    padding: 12
  }
});
