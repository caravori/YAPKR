import {Image, View} from "react-native";
import {useContext} from "react";
import {Context} from "../components/Context";
import {Avatar} from "@rneui/themed";
import {getColor} from "./Pokedex";


function GetAsset(type) {
    return (
        <Image source={{uri: '../assets/' + type.toString() + '.png'}}/>
    )
}

const Pokemon = ({route}) => {

    const {state} = useContext(Context);
    const {pokemon} = route.params.pokemon;
    let color = getColor(pokemon.types[0].type.name)

    console.log(pokemon.sprites.other['official-artwork'].front_default)
    return (
        <View style={{flex: 1}}>
            <View style={{alignItems: 'center', borderRadius: 50, marginTop: 20}}>
                <!--
                   TODO: Para cada tipo, um background diferente tem alguns nos assets. 10 no total. Temos 16 tipos. Faltam 6 backgrounds
                -->
                <GetAsset/>
                <View style={{alignItems: 'center'}}>
                    <Avatar source={{uri: pokemon.sprites.other['official-artwork'].front_default}} size={200}/>
                </View>
            </View>

        </View>
    )
}

export default Pokemon;