import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../components/Context';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { Button } from 'react-native-paper';
import LoadingScreen from './LoadingScreen';
import { Colors } from '../Styles';
import { FontAwesome } from '@expo/vector-icons';
import { transparent } from 'react-native-paper/src/styles/themes/v2/colors';

export function getColor(type) {
    return [Colors[type]]
}
const Move = ({move}) => {
    const {state, dispatch} = useContext(Context);
    const [searchValue, setSearchValue] = useState('');
    const [moveList, setMoveList] = useState(state.moves);
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(
        ()=>{
            setMoveList(state.moves)
        }
        ,[state.moves]);
    function searchList(name){
        if(name == '' || name == undefined || !name){
            setMoveList(state.moves);
        }
        const filteredList = state.moves.filter(move => move.name.includes(name) || move.type.includes(name));
        setMoveList(filteredList);
    }
    function toggleSearch(){
        searchList('');
        setSearchOpen(!searchOpen);
    }
    function GetType({types: type}) {
        let colors1 = getColor(type)
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.types, {backgroundColor: colors1[0], borderColor: colors1[1]}]}>
                    
                    <ListItem.Subtitle style={styles.textTypes}>
                        {type.toUpperCase()}
                    </ListItem.Subtitle>
                </View>
            </View>
        )
    }
    function renderItem({item: move}) {
        return (
            <ListItem containerStyle={[styles.cardStyle, {backgroundColor: state.theme.colors.card}]}>
                <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
                    <View style={{}}>
                        <ListItem.Title style={[styles.ListTitle, {color: state.theme.colors.text}]}>
                            {move.name}
                        </ListItem.Title>
                        <Text style={{fontSize: 15, paddingBottom: 15, paddingRight: 5, color: state.theme.colors.text}}>
                            {move.description}
                        </Text>
                        <GetType types={move.type}/>
                    </View>
                    <View style={{width: 100, flexDirection: 'column'}}>
                        <Text style={{fontSize: 20, color: state.theme.dark ? "rgba(255,"+ (Math.floor(255 -( 255*(move.power/120)))) + ","+ (Math.floor(255 -( 255*(move.power/120)))) + ",1)" : "rgba("+ (Math.floor((move.power/100) * 255)) + ",0,0,1)"}}>
                            PWR: {move.power ? move.power : '0'}
                        </Text>
                        <Text style={{fontSize: 20, color: state.theme.dark ? "rgba("+ (Math.floor(255 - ((move.power/100) * 255))) + ",255,"+ (Math.floor(255 - ((move.power/100) * 255))) + ",1)" : "rgba(0,"+ (Math.floor((move.power/100) * 255)) + ",0,1)" }}>
                            ACC: {move.accuracy ? move.accuracy : '0'}
                        </Text>
                    </View>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
            {searchOpen ?
            
            <View style={{flexDirection:'row',width: window.width, margin: 5, borderColor:"rgba(0,0,0,0.3)", borderWidth: 2, borderRadius: 50}}>
                <TextInput placeholder='Pesquise por nome ou tipo!' placeholderTextColor={state.theme.colors.text} style={{paddingLeft:10,borderColor: transparent,flex: 20, height: 35, backgroundColor: "rgba(255,255,255,0)",color: state.theme.colors.text}} onChangeText={searchList}/>
                
                <Button style={{flex: 1, width: 35, height: 35, backgroundColor: "rgba(255,255,255,0)"}} icon="close" onPress={()=> toggleSearch()}>
                </Button>
            </View>
            :
            ''
        }
            {
                state.moves.length ?
                (<>
                <FlatList
                    data={moveList}
                    renderItem={renderItem}
                    keyExtractor={(move) => move.id}
                    maxToRenderPerBatch={30}
                    
                    />
                    { !searchOpen ?

<TouchableOpacity onPress={()=> toggleSearch()}>
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
        elevation:2
    }}>
        <FontAwesome name={'search'} size={25} color={'rgba(255,255,255,0.77)'}/>
    </View>
</TouchableOpacity>
: ''

}
                </>
                    ) :
                <LoadingScreen/>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 20,
        margin: 5,
        elevation: 3
    },
    ListTitle: {
        paddingBottom: 5,
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
        elevation: 1,
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
export default Move