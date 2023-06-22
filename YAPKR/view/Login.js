import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Login = () => {
  return (
    <View style={styles.container}>
        <Text>Oieee</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: window.height,
        width: window.width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login