import React, {useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pokedex from "./Pokedex";
import {Context} from "../components/Context";
import {TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();


const Navigator = () => {
    const {state, dispatch} = useContext(Context)

    const ligthSwitch=()=>{
        return(
            <TouchableOpacity onPress={()=>dispatch({type:'toggleTheme'})}>
                <FontAwesome name={state.icon} size={20} color={state.theme.colors.text}/>
            </TouchableOpacity>
        )
    }
    return (
        <NavigationContainer theme={state.theme}>
            <Stack.Navigator initialRouteName="Pokedex" screenOptions={{
                headerRight:()=> ligthSwitch()}}>
                <Stack.Screen name="Pokedex" component={Pokedex}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
