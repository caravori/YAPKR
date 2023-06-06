import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pokedex from "./Pokedex";
import {Context} from "../components/Context";
import {TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {createDrawerNavigator} from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
    const {state, dispatch} = useContext(Context)

    const lightSwitch=()=>{
        return(
            <TouchableOpacity onPress={()=>dispatch({type:'toggleTheme'})}>
                <FontAwesome name={state.icon} size={20} color={state.theme.colors.text}/>
            </TouchableOpacity>
        )
    }
    return (
        <NavigationContainer theme={state.theme}>
            <Drawer.Navigator initialRouteName="Pokedex" screenOptions={{
                headerRight:()=> lightSwitch(),
            }}>
                <Drawer.Screen name="Pokedex" component={Pokedex}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
