import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Pokedex from "./Pokedex";
import {Context} from "../components/Context";
import {Image, Text, TouchableOpacity} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import Style from "../Styles";
import DrawerSection from "react-native-paper/src/components/Drawer/DrawerSection";
import {Icon} from "@rneui/themed";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const Navigator = (props) => {
    const {state, dispatch} = useContext(Context)


    const CustomDrawer = (props) => {
        return (
            <>
                <DrawerContentScrollView {...props}>
                    <Image style={{width: 120, height: 120, alignSelf: 'center'}}
                           source={{uri: 'https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png'}}/>
                    <DrawerSection>
                        <DrawerItem label={() =>
                            <Text style={[Style.Text, {color: state.theme.colors.text}]}>Pokedex</Text>}
                                    onPress={() => props.navigation.navigate(Pokedex)}/>
                    </DrawerSection>
                    <TouchableOpacity style={{flex: 1, alignSelf: 'flex-end', justifyContent: 'flex-end', margin: 20}}
                                      onPress={() => dispatch({type: 'toggleTheme'})}>
                        <FontAwesome name={state.icon} size={30} color={state.theme.colors.text}/>
                    </TouchableOpacity>
                </DrawerContentScrollView>
            </>
        )
    }
    return (
        <NavigationContainer theme={state.theme}>
            <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}>
                <Drawer.Screen name="Pokedex" component={Pokedex}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

/*
*
* */

export default Navigator;
