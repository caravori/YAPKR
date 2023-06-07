import React, { useContext } from 'react'
import {FontAwesome5} from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const LoadingScreen = () => {
  return (
    <View style={style.container}>
        <FontAwesome5 name={'spinner'} size={30} color={"red"}/>
        <Text>Loading</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        justifyContent: "center",
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})

export default LoadingScreen