import React, {useContext} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {FontAwesome} from "@expo/vector-icons";
import {Context} from "../components/Context";



const Login = (props) => {
    const {dispatch} = useContext(Context);
    async function onGoogleButtonPress() {

        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const userInfo = await GoogleSignin.signIn();
        const {idToken, accessToken} = await GoogleSignin.getTokens()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        dispatch({type: 'onAuthStateChanged', payload: userInfo})
        return auth().signInWithCredential(googleCredential);

    }
    return (
        <View>
            <Text>Hi</Text>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => { onGoogleButtonPress().then(() => props.navigation.navigate({routeName:'Pokedex'})).catch(error => {console.log(error)});
                }}
            />

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