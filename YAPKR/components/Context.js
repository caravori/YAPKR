import React, {createContext, useEffect, useReducer, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import axios from "axios";
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const Context = createContext({});

const initialState = {
    theme: DefaultTheme ,
    isDark: false,
    icon: 'sun-o',
    pokemons: [],
    team: [],
    moves: []
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

async function requestMoves(pokemons){
    try {
        let moves = [];
        let moveUrlSet = new Set();
        for(let pokemon of pokemons){
            for(let move of pokemon.moves){
                moveUrlSet.add(move);
            }
        }
        let moveArray = Array.from(moveUrlSet);
        for(let move of moveArray){
            await axios({
                method: 'get',
                url: move
            }).then((resp)=>{
                let data = resp.data
                let move = {
                    id: data.id,
                    name: data.name,
                    description: data.flavor_text_entries.map((description)=>{if (description.language.name == 'en'){return description.flavor_text}})[0],
                    accuracy: data.accuracy,
                    power: data.power,
                    type: data.type.name
                }
                moves.push(move);
            })
        }
        return moves;

    } catch(e){
        console.error(e)
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
                let moves = data.moves.map(move=>{return move.move.url});
                
                let pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    abilities: data.abilities,
                    sprites: data.sprites.other['official-artwork'].front_default ,
                    types: data.types,
                    stats: data.stats,
                    weight: data.weight,
                    moves: moves
                }

                response.push(pokemon);
            })
        }
        return response
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
    updateMoves(state,action){
        const updated = action.payload;
        const updatedState = {...state, moves: updated.moves}
        saveCache(updatedState);
        return updatedState
    },
    addToTeam(state,action){
        const pokemon = action.payload;
        if(state.team.length > 6)
            return;
        const updatedState = {...state,team: [...state.team,pokemon]}
        saveCache(updatedState);
        return updatedState;
    },
    removeFromTeam(state,action){
        const pokemon = action.payload;
        const updatedState = {...state,team: [...state.team.filter((poke)=>poke.id !== pokemon.id)]}
        saveCache(updatedState);
        return updatedState;
    },
    toggleTheme(state) {
        const toggle = state.theme === DarkTheme ? DefaultTheme : DarkTheme;
        const moon = state.theme === DarkTheme ? 'moon-o': 'sun-o';
        const isDark = !state.isDark
        saveCache({...state, theme: toggle, icon: moon, isDark: isDark});
        return {...state, theme: toggle, icon: moon};
    },
};

const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(()=>{
        async function fetchData(){
            const loadedState = await loadCache()
            if(state.pokemons.length === 0){
                const pokemons = await requestAPI(151);
                await dispatch({type: 'updatePokemon',payload: {pokemons}})
                const moves = await requestMoves(pokemons);
                dispatch({type: 'updateMoves',payload: {moves}})
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
