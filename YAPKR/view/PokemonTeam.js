import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Context } from "../components/Context";
import { Avatar, Image, ListItem } from "@rneui/themed";
import { Colors } from "../Styles";
import PokemonListItem from "./PokemonListItem";

const PokemonTeam = () => {
  const { state, dispatch } = useContext(Context);
  
  function renderItem({item: pokemon}){
    return (
      <PokemonListItem action={''} pokemon={pokemon}/>
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
