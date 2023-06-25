import React, {useContext, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Pokedex from "./Pokedex";
import {Context} from "../components/Context";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import Style from "../Styles";
import DrawerSection from "react-native-paper/src/components/Drawer/DrawerSection";
import {Switch} from "react-native-paper";
import PokemonTeam from "./PokemonTeam";
import Pokemon from "./Pokemon";
import ItemList from "./ItemList";
import Move from "./MoveList";
import Login from "./Login";
import Nature from "./Nature";
import {Avatar} from "@rneui/themed";
import {GoogleSignin} from "@react-native-google-signin/google-signin";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const Navigator = (props) => {
    const {state, dispatch} = useContext(Context)
    const [isDarkTheme, setIsDarkTheme] = useState(state.isDark);
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            dispatch({type: 'onAuthStateChanged', payload: null});
        } catch (error) {
            console.error(error);
        }
    };
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        dispatch({type: 'toggleTheme'})
    };
    const CustomDrawer = (props) => {
        return (
            <>
                <DrawerContentScrollView {...props} >
                    <Image style={style.imageStyle}
                           source={{uri: 'https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png'}}/>
                    <DrawerSection showDivider={false} style={style.drawerSection}>
                        <View style={style.drawerScreen}>
                            {state.logged ?
                                <>
                                    <View style={style.signOutView}>
                                        <TouchableOpacity
                                            onPress={() => signOut()}>
                                            <View style={style.signOutButton}>
                                                <Text style={[Style.Text, {
                                                    fontWeight: 'bold',
                                                    color: state.theme.colors.text
                                                }]}>Logout</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={style.userView}>
                                            <Avatar
                                                source={{
                                                    uri: state.user?.photoURL ?
                                                        state.user?.photoURL : state.user?.user?.photo
                                                }}
                                                size={50} rounded/>
                                            <Text style={[Style.Text, {
                                                fontWeight: 'bold',
                                                color: state.theme.colors.text, marginLeft: 10
                                            }]}>{state.user?.displayName?.split(' ')[0] ?
                                                state.user?.displayName?.split(' ')[0] : state.user?.user?.givenName}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                                :

                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('Login', props)}>
                                    <View style={style.loginButton}>

                                        <Text style={[Style.Text, {
                                            fontWeight: 'bold',
                                            color: state.theme.colors.text
                                        }]}>Login</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </DrawerSection>
                    <DrawerSection style={{borderBottomColor: 'red', borderBottomWidth: 2}} showDivider={false}>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Pokedex</Text>}
                                    onPress={() => props.navigation.navigate('Pokedex', props)}/>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Meu time</Text>}
                                    onPress={() => props.navigation.navigate("Meu time", props)}/>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Lista de Itens</Text>}
                                    onPress={() => props.navigation.navigate('Lista de Itens')}/>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Lista de Movimentos</Text>}
                                    onPress={() => props.navigation.navigate('Movimentos')}/>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Naturezas</Text>}
                                    onPress={() => props.navigation.navigate('Naturezas')}/>
                    </DrawerSection>
                    <View
                        style={style.darkMode}>
                        <Text style={{color: state.theme.colors.text, fontSize: 15}}>Dark Mode</Text>
                        <View style={{marginLeft: '50%'}}>
                            <Switch value={isDarkTheme} onValueChange={toggleTheme} color={'red'}/>
                        </View>
                    </View>
                </DrawerContentScrollView>
            </>
        )
    }
    return (
        <NavigationContainer theme={state.theme}>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}>
                <Drawer.Screen name="Pokedex" component={Pokedex}/>
                <Drawer.Screen name="Meu time" component={PokemonTeam}/>
                <Drawer.Screen name='Pokemon' component={Pokemon}/>
                <Drawer.Screen name='Lista de Itens' component={ItemList}/>
                <Drawer.Screen name='Movimentos' component={Move}/>
                <Drawer.Screen name='Login' component={Login}/>
                <Drawer.Screen name='Naturezas' component={Nature}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};


export default Navigator;

const style = StyleSheet.create({
        imageStyle: {width: 120, height: 120, alignSelf: 'center', marginTop: 15, marginBottom: 10},
        drawerSection: {borderBottomColor: 'red', borderBottomWidth: 2},
        drawerScreen: {
            flexDirection: 'row',
            marginLeft: 10,
            alignItems: 'center',
            flex: 1,
            paddingBottom: 10
        },
        signOutView: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-between',

        },
        signOutButton: {
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0)',
            width: 80,
            maxHeight: 40,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            borderWidth: 2,
            borderColor: 'red',
        },
        userView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        loginButton: {
            borderRadius: 10,
            backgroundColor: 'rgba(0,0,0,0)',
            width: 80,
            height: 40,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: 'red',
        },
        darkMode: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20
        }


    }
)