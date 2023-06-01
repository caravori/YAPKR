import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import login from "./Login";
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import pokedex from "./Pokedex";
import {createContext, useContext, useState} from "react";
import Context from "../components/Context";


const navigator = () =>{
    const {state} = useContext(Context)
    return (
        <NavigationContainer theme={state.Theme}>
            <Stack.Navigator initalState={pokedex/*Melhor iniciar na pokedex ja */} screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={'Pokedex'} component={pokedex}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default navigator;