import React, {createContext, useEffect, useReducer} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import axios from "axios";
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const Context = createContext({});

const initialState = {
    theme: DarkTheme,
    icon: 'sun-o',
    pokemons: []
    // pokemons: TODO: Load pokemons if in memory, else get from api
};

const reducer = (state, action) => {
    const fn = actions[action.type];
    return !fn ? state : fn(state, action);
};

async function saveCache(state){
    try{
        await AsyncStorage.setItem('state',JSON.stringify(state));
    } catch(e) {
        console.error(e);
    }
}
async function loadCache(){
    try{
        const state = await AsyncStorage.getItem('state');
        console.warn(state);
        return { state: state ? JSON.parse(state) : {}}   
    } catch (e) {

    }
}
async function requestAPI(){

}
const actions = {
    
    update(state,action){
        const updated = action.payload;
        const updatedState = {...state, theme: updated.theme,icon: updated.icon}
        return updatedState
    },
    toggleTheme(state) {
        const toggle = state.theme === DarkTheme ? DefaultTheme : DarkTheme;
        const moon = state.theme === DarkTheme ? 'moon-o': 'sun-o';
        saveCache({...state, theme: toggle, icon: moon});
        return {...state, theme: toggle, icon: moon};
    },
};

const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    saveCache(initialState);
    
    useEffect(()=>{
        async function fetchData(){
            const loadedState = await loadCache()
            if(loadedState == null)
        }
    })
    loadCache()
    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
};

export {ContextProvider,Context};
