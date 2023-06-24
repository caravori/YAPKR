import React, {useContext} from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
import {Context} from "../components/Context";
import PokemonListItem from "./PokemonListItem";

const PokemonTeam = (props) => {
    const {state, dispatch} = useContext(Context);

    function renderItem({item: pokemonF}) {
        console.log(state.pokemons.filter((poke)=>poke.id === pokemonF.id)[0])
        const pokemon = state.pokemons.filter((poke)=>poke.id == pokemonF.id)[0]
        return (
                <TouchableOpacity onPress={()=>props.navigation.navigate('Pokemon', {pokemon: {pokemon}})}>
                <PokemonListItem pokemon={pokemonF}/>
            </TouchableOpacity>

        )
    }

    return (
        <View>
            <FlatList
                data={state.team}
                renderItem={renderItem}
                keyExtractor={(poke) => poke.id}
                maxToRenderPerBatch={30}
            />
        </View>
    );
};

export default PokemonTeam;
