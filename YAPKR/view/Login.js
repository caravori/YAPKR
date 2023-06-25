import React, {useContext} from 'react'
import {StyleSheet, Text, TouchableOpacity, Image, Dimensions, View} from 'react-native'
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {FontAwesome} from "@expo/vector-icons";
import {Context} from "../components/Context";
import * as ALL from '../assets';


const Login = (props) => {
    const {state, dispatch} = useContext(Context);
    async function onGoogleButtonPress() {

        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const userInfo = await GoogleSignin.signIn();
        const {idToken, accessToken} = await GoogleSignin.getTokens()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        dispatch({type: 'onAuthStateChanged', payload: userInfo})

        return auth().signInWithCredential(googleCredential);

    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image style={{width: 300, height: 300, alignSelf: 'center', marginTop: 15, marginBottom: 10}}
                       source={ALL[`${state.theme.dark ? 'logoDark' : 'logoLight'}`]}/>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => { onGoogleButtonPress().then(() => props.navigation.navigate('Pokedex')).catch(error => {console.log(error)});
                    }}
                />
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
        alignItems: 'center',
        marginBottom: 150

    }
})

export default Login