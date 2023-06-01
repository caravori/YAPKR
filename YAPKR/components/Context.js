import {createContext, useReducer, useState} from "react";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";


const Context = createContext({})

const initialState = {
    Theme: DarkTheme,
}

const actions ={
    toggleTheme(state, action){
        const toggle = state.Theme === DarkTheme? DefaultTheme : DarkTheme
        return{...state, Theme: toggle }
    }
}

const context = (props) =>{
    const [state, dispatch] = useReducer(reducer, initialState)
    function reducer(state, action) {
        const fn = actions [action.type]
        return !fn ? state : fn(state, action)
    }
    return(
       <Context.Provider value={{state,dispatch}}>
           {props.children}
       </Context.Provider>
    )
}
export default context