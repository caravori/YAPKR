import {Button, Text, View} from "react-native";
import {DefaultTheme} from "@react-navigation/native";
import {useContext, useState} from "react";
import Context from "../components/Context";


const Pokedex = () =>{
    const {dispatch} = useContext(Context);
    return(
        <View>
            <Text style={{color:'white'}}>Hi</Text>
            <Button title={'Tema'} onPress={dispatch({type: 'toggleTheme'})}/>
        </View>
    )
}
export default Pokedex;