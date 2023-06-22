import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Button} from "react-native-paper";

async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const Login = () => {
    return (
        <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
    );}

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