import React, {createContext, useEffect, useReducer, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import axios from "axios";
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const Context = createContext({});

const initialState = {
    theme: DarkTheme,
    icon: 'sun-o',
    pokemons: []
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
        return { state: state ? JSON.parse(state) : {}}   
    } catch (e) {

    }
}
async function requestAPI(numberPokemons){
    try {
        let response = [];
        for(let i=1; i<numberPokemons+1;i++){
            await axios({
                method: 'get',
                url: baseUrl+i,
            }).then((resp)=>{
                let data = resp.data;
                delete data.game_indices ;
                delete data.sprites.versions
                delete data.moves
                response.push(data);
            })
        }
        return response;
    } catch(e) {
        console.error(e);
    }
}
const actions = {
    load(state,action){
        const loadedCache = action.payload;
        return {...loadedCache.state}
    },
    updatePokemon(state,action){
        const updated = action.payload;
        const updatedState = {...state, pokemons: updated.pokemons}
        saveCache(updatedState);
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
    useEffect(()=>{
        async function fetchData(){
            const loadedState = await loadCache()
            if(loadedState === {} || state.pokemons.length === 0){
                const pokemons = await requestAPI(151);
                dispatch({type: 'updatePokemon',payload: {pokemons}})
            }
            else {
                dispatch({type: 'load', payload: loadedState});
            }
        }
        fetchData();
    },[])
    loadCache()
    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
};

export {ContextProvider,Context};
