import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Avatar, ListItem} from "@rneui/themed";
import {Context} from "../components/Context";
import {FlatList} from "react-native-gesture-handler";
import {Colors} from '../Styles'
import LoadingScreen from "./LoadingScreen";
import {Button} from "react-native-paper";
import {FontAwesome} from "@expo/vector-icons";
import {transparent} from "react-native-paper/src/styles/themes/v2/colors";

export function getColor(type) {
    return [Colors[type], Colors[type + 'b']]
}

const Pokedex = (props) => {
    const {state} = useContext(Context);
    const [pokemonList, setPokemonList] = useState(state.pokemons);
    const [searchOpen, setSearchOpen] = useState(false);

    function GetTypes({types: types}) {
        let colors1 = getColor(types[0].type.name)
        let colors2;
        if (types[1] !== undefined) {
            colors2 = getColor(types[1].type.name)

            return (<View style={{flexDirection: 'row'}}>
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
                </View>)
        } else {
            return (<View style={[styles.types, {backgroundColor: colors1[0], borderColor: colors1[1]}]}>
                    <ListItem.Subtitle style={styles.textTypes}>
                        {types[0].type.name.toUpperCase()}
                    </ListItem.Subtitle>
                </View>)
        }
    }

    function getPokemons({item: pokemon}) {
        let colors = getColor(pokemon.types[0].type.name)
        return (<TouchableOpacity onPress={() => props.navigation.navigate("Pokemon", {pokemon: {pokemon}})}>
                <ListItem containerStyle={[styles.cardStyle, {backgroundColor: state.theme.colors.card}]}>
                    <ListItem.Content>
                        <ListItem.Title style={[styles.ListTitle, {color: state.theme.colors.text}]}>
                            {pokemon.name}
                        </ListItem.Title>
                        <GetTypes types={pokemon.types}/>
                    </ListItem.Content>
                    <View style={[styles.avatar, {backgroundColor: colors[0], borderColor: colors[1]}]}>
                        <Avatar size={100} source={{uri: pokemon.sprites}}/>
                    </View>
                </ListItem>
            </TouchableOpacity>

        )
    }

    function searchList(name) {
        if (name === '' || name === undefined || !name) {
            setPokemonList(state.pokemons);
        }
        const filteredList = state.pokemons.filter(pokemon => pokemon.name.includes(name.toLowerCase()) || pokemon.types[0].type.name.includes(name.toLowerCase()) || pokemon.types[1]?.type.name.includes(name.toLowerCase()));
        setPokemonList(filteredList);
    }

    useEffect(() => {
        setPokemonList(state.pokemons);
    }, [state.pokemons]);

    function toggleSearch() {
        searchList('');
        setSearchOpen(!searchOpen);
    }

    return (<View>
            {searchOpen ?

                <View style={{
                    flexDirection: 'row',
                    width: window.width,
                    margin: 5,
                    borderColor: "rgba(0,0,0,0.3)",
                    borderWidth: 2,
                    borderRadius: 50
                }}>
                    <TextInput placeholder='Pesquise por nome ou tipo!' placeholderTextColor={state.theme.colors.text}
                               style={{
                                   paddingLeft: 10,
                                   borderColor: transparent,
                                   flex: 20,
                                   height: 35,
                                   backgroundColor: "rgba(255,255,255,0)",
                                   color: state.theme.colors.text
                               }} onChangeText={searchList}/>
                    <Button style={{flex: 1, width: 35, height: 35, backgroundColor: "rgba(255,255,255,0)"}}
                            icon="close" onPress={() => toggleSearch()}>
                    </Button>
                </View> : ''}
            {state.pokemons.length ? (<>
                    <FlatList
                        data={pokemonList}
                        renderItem={getPokemons}
                        keyExtractor={poke => poke.id}
                        maxToRenderPerBatch={30}/>
                    {!searchOpen ?

                        <TouchableOpacity onPress={() => toggleSearch()}>
                            <View style={{
                                position: 'absolute',
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                right: 20,
                                bottom: 30,
                                borderRadius: 50,
                                backgroundColor: "#ee1515",
                                elevation: 2
                            }}>
                                <FontAwesome name={'search'} size={25} color={'rgba(255,255,255,0.77)'}/>
                            </View>
                        </TouchableOpacity> : ''

                    }
                </>) : <LoadingScreen></LoadingScreen>}
        </View>)
}

const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 20, margin: 5, elevation: 3
    }, ListTitle: {
        paddingBottom: 15, fontSize: 25, textTransform: 'capitalize'
    }, avatar: {
        borderRadius: 20, borderWidth: 6, alignItems: 'flex-start',
    }, types: {
        borderRadius: 10, padding: 8, borderWidth: 1, marginRight: 5, elevation: 1
    }, textTypes: {
        fontSize: 15, color: '#ffffff', fontWeight: 'bold', textShadowColor: '#646464', textShadowRadius: 1
    }
})
export default Pokedex;