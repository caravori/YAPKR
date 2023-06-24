import React, {createContext, useEffect, useReducer} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import axios from "axios";
import {moveData, pokeData} from "../json/json_data";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import {db} from "../firebaseConfig";
import {get, ref, set} from "firebase/database";
import {Alert} from "react-native";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const Context = createContext({});

const initialState = {
    theme: DefaultTheme,
    isDark: false,
    icon: 'sun-o',
    pokemons: [],
    moves: [],
    team: [],
    itens: [],
    initializing: true,
    logged: true,
    isPokemonDataLoaded: false
};

const reducer = (state, action) => {
    const fn = actions[action.type];
    return !fn ? state : fn(state, action);
};

// Adicione o `async` à função para permitir o uso de `await`
async function saveCache(state) {
    try {
        await AsyncStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
}

// Adicione o `async` à função para permitir o uso de `await`
async function loadCache() {
    try {
        const state = await AsyncStorage.getItem('state');
        return {state: state ? JSON.parse(state) : {}};
    } catch (e) {
        // Adicione um retorno nulo ou lance o erro
        console.error(e);
        return null;
    }
}

// Adicione o `async` à função para permitir o uso de `await`
async function requestMoves(pokemons) {
    if (moveData.length !== 0) {
        return moveData;
    }
    try {
        let moves = [];
        let moveUrlSet = new Set();
        for (let pokemon of pokemons) {
            for (let move of pokemon.moves) {
                moveUrlSet.add(move);
            }
        }
        let moveArray = Array.from(moveUrlSet);
        for (let move of moveArray) {
            const resp = await axios({
                method: 'get',
                url: move
            });
            let data = resp.data;
            let move = {
                id: data.id,
                name: data.name,
                description: data.flavor_text_entries.map((description) => {
                    if (description.language.name === 'en') {
                        return description.flavor_text;
                    }
                })[0],
                accuracy: data.accuracy,
                power: data.power,
                type: data.type.name
            };
            moves.push(move);
        }
        return moves;
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Adicione o `async` à função para permitir o uso de `await`
async function requestAPI(numberPokemons) {
    if (pokeData.length !== 0) {
        return pokeData;
    }
    try {
        let response = [];
        for (let i = 1; i < numberPokemons + 1; i++) {
            const resp = await axios({
                method: 'get',
                url: baseUrl + i,
            });
            let data = resp.data;
            let moves = data.moves.map(move => {
                return move.move.url;
            });
            let pokemon = {
                id: data.id,
                name: data.name,
                height: data.height,
                abilities: data.abilities,
                sprites: data.sprites.other['official-artwork'].front_default,
                types: data.types,
                stats: data.stats,
                weight: data.weight,
                moves: moves
            };
            response.push(pokemon);
        }
        return response;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const actions = {
    load(state, action) {
        const loadedCache = action.payload;
        return {...loadedCache.state};
    },
    updatePokemon(state, action) {
        const updated = action.payload;
        const updatedState = {...state, pokemons: updated.pokemons};
        saveCache(updatedState);
        return updatedState;
    },
    updateMoves(state, action) {
        const updated = action.payload;
        const updatedState = {...state, moves: updated.moves};
        saveCache(updatedState);
        return updatedState;
    },
    addToTeam(state, action) {
        const pokemon = action.payload;
        if (state.team.length >= 6) {
            Alert.alert('Atenção','Você só pode ter 6 Pokemons no seu time!')
            return state;
        }
        const updatedState = {...state, team: [...state.team, pokemon]};
        const currentUser = auth().currentUser;
        if (currentUser && currentUser.uid) {
            const userId = currentUser.uid;
            set(ref(db, `users/${userId}/team/${pokemon.id}`), true)
                .then(() => {
                    set(ref(db, `users/${userId}/team/${pokemon.id}/${pokemon.name}`), true);
                    set(ref(db, `users/${userId}/team/${pokemon.id}/${pokemon.name}/sprite`), pokemon.sprites)
                        .then(() => {
                            console.log('success sprite');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    set(ref(db, `users/${userId}/team/${pokemon.id}/${pokemon.name}/types`), [pokemon.types])
                        .then(() => {
                            console.log('success types');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('Usuário não autenticado');
        }
        saveCache(updatedState);
        return updatedState;
    },
    loadTeam(state, action) {
        const pokemons = action.payload;
        return {...state, team: pokemons};
    },
    removeFromTeam(state, action) {
        const pokemon = action.payload;
        const updatedState = {...state, team: [...state.team.filter((poke) => poke.id !== pokemon.id)]};
        const currentUser = auth().currentUser;
        if (currentUser && currentUser.uid) {
            const userId = currentUser.uid;
            set(ref(db,`users/${userId}/team/${pokemon.id}`),null).then(()=>console.log('removed'))
        }
        saveCache(updatedState);
        return updatedState;
    },
    toggleTheme(state) {
        const toggle = state.theme === DarkTheme ? DefaultTheme : DarkTheme;
        const moon = state.theme === DarkTheme ? 'moon-o' : 'sun-o';
        const isDark = !state.isDark;
        saveCache({...state, theme: toggle, icon: moon, isDark: isDark});
        return {...state, theme: toggle, icon: moon};
    },
    onAuthStateChanged(state, action) {
        const user = action.payload;
        return {...state, user: user, initializing: !state.initializing, logged: user !== null};
    },
};

const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    GoogleSignin.configure({
        WebClientId: "266648132391-p8ae5ul7vqmsnkc84q9njl719c8qdju0.apps.googleusercontent.com",
    });

    useEffect(() => {
        async function fetchData() {
            const loadedState = await loadCache()
            if (state.pokemons.length === 0) {
                const pokemons = await requestAPI(151);
                await dispatch({type: 'updatePokemon', payload: {pokemons}})
                const moves = await requestMoves(pokemons);
                dispatch({type: 'updateMoves', payload: {moves}})
            } else {
                dispatch({type: 'load', payload: loadedState});
            }
        }

        fetchData();
    }, [])
    loadCache()

    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser && currentUser.uid) {
            const userId = currentUser.uid;

            async function loadTeamData() {
                const snapshot = await get(ref(db, `users/${userId}/team`));
                if (snapshot.exists()) {
                    const teamData = snapshot.val();
                    const pokemons = Object.keys(teamData).map((key) => {
                        const pokemon = teamData[key];
                        const id = parseInt(key);
                        const name = Object.keys(pokemon)[0];
                        const sprites = pokemon[name].sprite;
                        const types = pokemon[name].types[0];
                        return {
                            id,
                            name,
                            sprites,
                            types,
                        };
                    });
                    dispatch({type: 'loadTeam', payload: pokemons});

                }
            }

            loadTeamData();
        }
    }, []);

    useEffect(() => {
        return auth().onAuthStateChanged((user) => dispatch({type: 'onAuthStateChanged', payload: user})); // unsubscribe on unmount
    }, []);


    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
};

export {ContextProvider, Context};
