import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {Avatar, ListItem} from "@rneui/themed";
import {Context} from "../components/Context";
import {FlatList} from "react-native-gesture-handler";
import {Colors} from '../Styles'
import LoadingScreen from "./LoadingScreen";

export function getColor(type) {
    return [Colors[type], Colors[type + 'b']]
}

const Pokedex = (props) => {
    const {state} = useContext(Context);



    function GetTypes({types: types}) {
        let colors1 = getColor(types[0].type.name)
        let colors2;
        if (types[1] !== undefined) {
            colors2 = getColor(types[1].type.name)

            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.types, {backgroundColor: colors1[0], borderColor: colors1[1]}]}>
                        <ListItem.Subtitle style={styles.textTypes}>
                            {types[0].type.name.toUpperCase()}
                        </ListItem.Subtitle>
                    </View>

                    <View style={[styles.types, {backgroundColor: colors2[0], borderColor: colors2[1]}]}>
                        <ListItem.Subtitle style={styles.textTypes}>
                            {types[1].type.name.toUpperCase()}
                        </ListItem.Subtitle>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.types, {backgroundColor: colors1[0], borderColor: colors1[1]}]}>
                    <ListItem.Subtitle style={styles.textTypes}>
                        {types[0].type.name.toUpperCase()}
                    </ListItem.Subtitle>
                </View>
            )
        }
    }

    function getPokemons({item: pokemon}) {
        let colors = getColor(pokemon.types[0].type.name)
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate("Pokemon", {pokemon: {pokemon}})}>
                <ListItem containerStyle={[styles.cardStyle, {backgroundColor: state.theme.colors.card}]}>
                    <ListItem.Content>
                        <ListItem.Title style={[styles.ListTitle, {color: state.theme.colors.text}]}>
                            {pokemon.name}
                        </ListItem.Title>
                        <GetTypes types={pokemon.types}/>
                    </ListItem.Content>
                    <View style={[styles.avatar, {backgroundColor: colors[0], borderColor: colors[1]}]}>
                        <Avatar size={100} source={{uri: pokemon.sprites.other['official-artwork'].front_default}}/>
                    </View>
                </ListItem>
            </TouchableOpacity>

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

const styles = StyleSheet.create({
        cardStyle: {
            borderRadius: 20,
            margin: 5,
            elevation: 3
        },
        ListTitle: {
            paddingBottom: 15,
            fontSize: 25,
            textTransform: 'capitalize'
        },
        avatar: {
            borderRadius: 20,
            borderWidth: 6,
            alignItems: 'flex-start',
        },
        types: {
            borderRadius: 10,
            padding: 8,
            borderWidth: 1,
            marginRight: 5,
            elevation: 1
        },
        textTypes: {
            fontSize: 15,
            color: '#ffffff',
            fontWeight: 'bold',
            textShadowColor: '#646464',
            textShadowRadius: 1
        }
    }
)
export default Pokedex;