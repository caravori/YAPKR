import {View} from "react-native";
import React, {useContext} from "react";
import {Avatar, ListItem} from "@rneui/themed";
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

const Pokedex = () => {
    const {state} = useContext(Context);
    function getColor(type) { // Gets the type, return the color
        return [Colors[type], Colors[type + 'b']]
    }

    function GetTypes({types: types}) {
        let colors1 = getColor(types[0].type.name)
        let colors2;
        if (types[1] !== undefined) {
            colors2 = getColor(types[1].type.name)
            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        backgroundColor: colors1[0],
                        borderRadius: 10,
                        padding: 8,
                        borderColor: colors1[1],
                        borderWidth: 1,
                        marginRight: 5,
                    }}>
                        <ListItem.Subtitle style={{
                            color: 'black',
                            fontWeight: 'bold'
                        }}>{types[0].type.name.toUpperCase()}</ListItem.Subtitle>
                    </View>
                    <View style={{
                        backgroundColor: colors2[0],
                        borderRadius: 10,
                        padding: 8,
                        borderColor: colors2[1],
                        borderWidth: 1
                    }}>
                        <ListItem.Subtitle style={{
                            color: 'black',
                            fontWeight: 'bold'
                        }}>{types[1].type.name.toUpperCase()}</ListItem.Subtitle>
                    </View>
                </View>
            )
        } else {

            return (
                <View style={{
                    backgroundColor: colors1[0],
                    borderRadius: 10,
                    padding: 8,
                    borderColor: colors1[1],
                    borderWidth: 1,
                    marginRight: 5,
                }}>
                    <ListItem.Subtitle style={{
                        color: 'black',
                        fontWeight: 'bold'
                    }}>{types[0].type.name.toUpperCase()}</ListItem.Subtitle>
                </View>
            )
        }
    }

    function getPokemons({item: pokemon}) {
        let colors = getColor(pokemon.types[0].type.name)
        return (
            <ListItem
                containerStyle={{backgroundColor: state.theme.colors.card, borderRadius: 20, margin: 8}}
            >
                <ListItem.Content>
                    <ListItem.Title style={{
                        color: state.theme.colors.text,
                        paddingBottom: 15,
                        fontSize: 25,
                        textTransform: 'capitalize'
                    }}>{pokemon.name}</ListItem.Title>
                    <GetTypes types={pokemon.types}/>
                </ListItem.Content>
                <View style={{
                    backgroundColor: colors[0],
                    borderRadius: 20,
                    borderColor: colors[1],
                    borderWidth: 6,
                    alignItems: 'flex-start',
                }}>
                    <Avatar size={100} source={{uri: pokemon.sprites.other['official-artwork'].front_default}}/>
                </View>
            </ListItem>
        )
    }

    return (
        <View>
            {state.pokemons.length ?
                <FlatList
                    data={state.pokemons}
                    renderItem={getPokemons}
                    keyExtractor={poke => poke.id}
                    maxToRenderPerBatch={30}/>
                : <LoadingScreen></LoadingScreen>
            }
        </View>
    )
}
export default Pokedex;