import React, {useContext, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Pokedex from "./Pokedex";
import {Context} from "../components/Context";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import Style from "../Styles";
import DrawerSection from "react-native-paper/src/components/Drawer/DrawerSection";
import {Switch} from "react-native-paper";
import PokemonTeam from "./PokemonTeam";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const Navigator = (props) => {
    const {state, dispatch} = useContext(Context)
    const [isDarkTheme, setIsDarkTheme] = useState(state.isDark);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        dispatch({type: 'toggleTheme'})
    };
    const CustomDrawer = (props) => {
        return (
            <>
                <DrawerContentScrollView {...props} >
                        <Image style={{width: 120, height: 120, alignSelf: 'center', marginTop: 15, marginBottom: 10}}
                               source={{uri: 'https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png'}}/>
                        <DrawerSection showDivider={false} style={{borderBottomColor: 'red', borderBottomWidth: 2}}>
                            <TouchableOpacity>
                                <View style={{
                                    borderRadius: 10,
                                    backgroundColor: 'red',
                                    marginLeft: 20,
                                    marginBottom: 20,
                                    width: 60,
                                    height: 40,
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={[Style.Text, {fontWeight: 'bold'}]}>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </DrawerSection>
                        <DrawerSection style={{borderBottomColor: 'red', borderBottomWidth: 2}} showDivider={false}>
                            <DrawerItem label={() =>
                                <Text style={[Style.Text, {color: state.theme.colors.text}]}>Pokedex</Text>}
                                        onPress={() => props.navigation.navigate(Pokedex, props)}/>
                        </DrawerSection>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems: 'center',
                                marginHorizontal: 20
                            }}>
                            <Text style={{color: state.theme.colors.text, fontSize: 15}}>Dark Mode</Text>
                            <View style={{marginLeft: '50%'}}>
                                <Switch value={isDarkTheme} onValueChange={toggleTheme} color={'red'}/>
                            </View>

                        </TouchableOpacity>
                    </DrawerSection>
                    <DrawerSection style={{borderBottomColor: 'red', borderBottomWidth: 2}} showDivider={false}>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Pokedex</Text>}
                                    onPress={() => props.navigation.navigate(Pokedex)}/>
                    </DrawerSection>
                    <DrawerSection style={{borderBottomColor: 'red', borderBottomWidth: 2}} showDivider={false}>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Meu time</Text>}
                                    onPress={() => props.navigation.navigate("Meu time")}/>
                    </DrawerSection>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 30,
                            marginHorizontal: 20
                        }}>
                        <Text style={{color: state.theme.colors.text, fontSize: 15}}>Dark Mode</Text>
                        <View style={{marginLeft: '50%'}}>
                            <Switch value={isDarkTheme} onValueChange={toggleTheme}/>
                        </View>
                </DrawerContentScrollView>
            </>
        )
    }
    return (
        <NavigationContainer theme={state.theme}>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/> } >
                <Drawer.Screen name="Pokedex" component={Pokedex}/>
                <Drawer.Screen name="Meu time" component={PokemonTeam}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};


export default Navigator;
