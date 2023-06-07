import {Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {Avatar, Button, Icon, ListItem} from "@rneui/themed";
import {Context} from "../components/Context";
import {FlatList} from "react-native-gesture-handler";
import {Colors} from '../Styles'
import LoadingScreen from "./LoadingScreen";

const pokemons = [{
    id: 1,
    name: 'Bulbasaur',
    type: 'Grass',
    hidden_hability: 'Chlorophyll',
    url: 'https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/250px-0001Bulbasaur.png'

}]

// Color By type

const Pokedex = () =>{
    const {state,dispatch} = useContext(Context);
    
    function getPokemons ({item: pokemon}){
        return(
            <ListItem
                containerStyle={{backgroundColor: state.theme.colors.card, borderRadius:20, margin:8}}
            >
                <ListItem.Content>
                    <ListItem.Title style={{color: state.theme.colors.text, paddingBottom: 15, fontSize:25}}>{pokemon.name}</ListItem.Title>
                    <View style={{backgroundColor: '#A7DB8D', borderRadius:10, padding:2, borderColor:'#7cbe46', borderWidth:1}}>
                        <ListItem.Subtitle style={{color: 'black'}}>{pokemon.types[0].type.name}</ListItem.Subtitle>
                    </View>
                </ListItem.Content>
                <View style={{
                    backgroundColor:'#A7DB8D',
                    borderRadius:20,
                    borderColor:Colors.grass,
                    borderWidth:6,
                    alignItems:'flex-start',
                    }}>
                    <Avatar size={100} source={{uri: pokemon.sprites.other['official-artwork'].front_default}}/>
                </View>
            </ListItem>
        )
    }
    return(
        <View>
            {state.pokemons.length ? 
            <FlatList
                data={state.pokemons}
                renderItem={getPokemons}
                keyExtractor={poke => poke.id}/>
            : <LoadingScreen></LoadingScreen>
            }
        </View>
    )
}
export default Pokedex;