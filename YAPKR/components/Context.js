import React, {createContext, useReducer} from "react";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";

const Context = createContext({});

const initialState = {
    theme: DarkTheme,
    icon: 'sun-o',
    // pokemons: TODO: Load pokemons if in memory, else get from api
};

const reducer = (state, action) => {
    const fn = actions[action.type];
    return !fn ? state : fn(state, action);
};

const actions = {
    toggleTheme(state) {
        const toggle = state.theme === DarkTheme ? DefaultTheme : DarkTheme;
        const moon = state.theme === DarkTheme ? 'moon-o': 'sun-o';
        return {...state, theme: toggle, icon: moon};
    },
};

const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    );
};

export {ContextProvider,Context};
