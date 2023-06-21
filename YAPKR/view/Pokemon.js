import React, {useContext} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from '@rneui/themed';
import {ScrollView} from 'react-native-gesture-handler';
import {Context} from '../components/Context';
import * as ALL from '../assets';
import {getColor} from './Pokedex';
import {FontAwesome} from "@expo/vector-icons";

const Pokemon = ({route}) => {
    const {state, dispatch} = useContext(Context);
    const {pokemon} = route.params.pokemon;
    const color = getColor(pokemon.types[0].type.name);
    return (
        <View style={{flex: 1}}>
            <View style={{borderRadius: 20, elevation: 100, overflow: 'hidden'}}>
                <ImageBackground
                    source={ALL[`${pokemon.types[0].type.name}`]}
                    resizeMethod="auto"
                    borderRadius={20}
                    style={{marginTop: 10, marginLeft: 5, marginRight: 5}}
                >
                    <View style={{alignItems: 'center', borderRadius: 50, marginTop: 20}}>
                        <View style={{alignItems: 'center'}}>
                            <Avatar source={{uri: pokemon.sprites}} size={200}/>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>
                <View
                    style={{
                        backgroundColor: state.theme.colors.card,
                        flex: 1,
                        borderRadius: 20,
                        padding: 5,
                        margin: 10,
                    }}
                >
                    <Text style={[styles.title, {color: state.theme.colors.text}]}>Status Base</Text>
                    <View style={[styles.statContainer, {backgroundColor: color[1]}]}>
                        <StatBar statName="HP" statColor="red" statValue={pokemon.stats[0].base_stat}/>
                        <StatBar statName="ATQ" statColor="#963a3a" statValue={pokemon.stats[1].base_stat}/>
                        <StatBar statName="DEF" statColor="#ffd256" statValue={pokemon.stats[2].base_stat}/>
                        <StatBar statName="ATQS" statColor="#75b0fc" statValue={pokemon.stats[3].base_stat}/>
                        <StatBar statName="DEFS" statColor="#73fd2c" statValue={pokemon.stats[4].base_stat}/>
                        <StatBar statName="VEL" statColor="#ff1bca" statValue={pokemon.stats[5].base_stat}/>
                    </View>
                    <Text style={[styles.title, {color: state.theme.colors.text}]}>Habilidades</Text>
                    <View style={[styles.statContainer, {backgroundColor: color[1], alignItems: 'center'}]}>
                        <Text style={[styles.statText, {alignSelf: 'center'}]}>Normal</Text>
                        <Ability abname={pokemon.abilities[0].ability.name.toUpperCase()}
                                 color="rgba(105,105,105,0.46)"/>
                        <Text style={[styles.statText, {alignSelf: 'center'}]}>Hidden</Text>
                        <Ability abname={pokemon.abilities[1]?.ability.name.toUpperCase()}
                                 color="rgba(105,105,105,0.46)"/>
                    </View>
                </View>
            </ScrollView>
            {!state.team.includes(pokemon)?
                <TouchableOpacity onPress={()=> dispatch({type:'addToTeam', payload: pokemon})}>
                    <View style={[
                        {backgroundColor: color[0]},
                        styles.floatingButtom
                    ]}>
                        <FontAwesome name={'plus'} size={30} color={'rgba(69,69,69,0.77)'}/>
                    </View>
                </TouchableOpacity>:
                <TouchableOpacity onPress={()=> dispatch({type:'removeFromTeam', payload: pokemon})}>
                    <View style={[
                        {backgroundColor: color[0]},
                        styles.floatingButtom
                    ]}>
                        <FontAwesome name={'minus'} size={30} color={'rgba(69,69,69,0.77)'}/>
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
};

const StatBar = ({statName, statValue, statColor}) => {
    const width = Math.max(Math.min(statValue * 2.1, 300), 100);
    return (
        <View style={[styles.statBar, {width: width, backgroundColor: statColor}]}>
            <Text style={styles.statText}>{`${statName} ${statValue}`}</Text>
        </View>
    );
};

const Ability = ({abname, color}) => {
    return (
        <View style={[styles.barAbility, {backgroundColor: color}]}>
            <Text style={[styles.statText, {fontSize: 20}]}>{abname}</Text>
        </View>
    );
};

const styles = {
    title: {
        fontSize: 22,
        alignSelf: 'center',
        marginTop: 5,
        fontWeight: 'bold',
    },
    statContainer: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 3,
    },
    statBar: {
        height: 28,
        borderRadius: 15,
        paddingLeft: 10,
        margin: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    statText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        textShadowColor: '#646464',
        textShadowRadius: 1,
    },
    barAbility: {
        flex:1,
        minWidth:200,
        alignItems: 'center',
        elevation: 1,
        padding: 5,
        borderRadius: 20,
        marginLeft: 60,
        marginRight: 60,
        margin: 5,
    },
    floatingButtom:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        borderRadius: 50,
        elevation:2
    }
};

export default Pokemon;
