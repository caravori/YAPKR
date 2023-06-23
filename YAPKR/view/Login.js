import React, {useContext} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {FontAwesome} from "@expo/vector-icons";
import {Context} from "../components/Context";

async function onGoogleButtonPress() {
    const {state, dispatch} = useContext(Context);
    try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const userInfo = await GoogleSignin.signIn();
        const {idToken, accessToken} = await GoogleSignin.getTokens()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        dispatch({type: 'onAuthStateChanged', payload: userInfo})
        return auth().signInWithCredential(googleCredential);
    } catch (e) {
        console.error(e)
        return null
    }

}

const Login = () => {
    return (
        <View>
            <Text>Hi</Text>
            <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                <FontAwesome name={'search'} size={25} color={'black'}/>
            </TouchableOpacity>
        </View>
    );
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