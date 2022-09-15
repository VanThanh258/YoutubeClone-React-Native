import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import SubItemSearch from '../components/SubItemSearch'
import HeaderSubSearch from '../components/HeaderSubSearch'
import { useEffect } from 'react'
import recommendApi from '../src/api/recommendApi'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecommend } from '../src/store/recommendSlice'
const data = ['Hoài Lâm', 'Đi đâu đó', 'Schannel', 'The masked singer viet nam', 'Trọng hiếu idol', 'Jong kook', 'Hello VietNam']
const SubSearch = ({navigation}) => {
    const [text,setText] = useState('');
    const dispatch = useDispatch()
    const recommend = useSelector(state => state.recommend);
    const {listWord} = recommend;
    useEffect(() => {
        dispatch(fetchRecommend('like'))
    },[])
    useEffect(() => {
        dispatch(fetchRecommend(text))
    },[text])
    const handleNavigationSearch = () => {
        navigation.push('Search')
    }
    const handleGoBack = () => {
        navigation.goBack();
    }
    const handleChangeText = (text) => {
        setText(text)
    }
    const handleSetText = (item) => {
        setText(item)
    }
  return (
    <View style={styles.container}>
      <HeaderSubSearch 
      onGoBack = {handleGoBack}
      onChangeText = {handleChangeText}
      value={text}
      />
      <ScrollView>
        {
            listWord.map((item,index) => {
                return (<SubItemSearch 
                    key={index}
                    onNavigationSearch = {handleNavigationSearch}
                    onSetText = {() => handleSetText(item)}
                    text={item}
                    />)
            })   
        }
      </ScrollView>
      
    </View> 
  )
}

export default SubSearch

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    }
})