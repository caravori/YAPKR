import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={{width: 120, height: 120, alignSelf: 'center', marginTop: 15, marginBottom: 10}}
          source={{uri: 'https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png'}}/>
        <Text>Botão do google vai aqui</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
      height: 300,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: 150
    }
})

export default Login