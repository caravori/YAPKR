import {Image, Text, View} from "react-native";
import {useContext} from "react";
import {Context} from "../components/Context";
import {Avatar} from "@rneui/themed";
import {getColor} from "./Pokedex";


const Pokemon = ({route}) =>{
    const {state} = useContext(Context);
    const {pokemon} = route.params.pokemon;
    let color = getColor(pokemon.types[0].type.name)
    console.log(pokemon.sprites.other['official-artwork'].front_default)
    return(
        <View style={{flex:1}}>
            <View style={{alignItems:'center', backgroundColor:color[0], borderRadius:50, marginTop:20}}>
                <Avatar source={{uri: pokemon.sprites.other['official-artwork'].front_default}} size={200}/>
            </View>
        </View>
    )
}

export default Pokemon;