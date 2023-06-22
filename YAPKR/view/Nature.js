import React, {useContext, useEffect, useState} from 'react'
import {Context} from '../components/Context';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ListItem} from '@rneui/themed';
import {Button} from 'react-native-paper';
import LoadingScreen from './LoadingScreen';
import {Colors} from '../Styles';
import {FontAwesome} from '@expo/vector-icons';
import {transparent} from 'react-native-paper/src/styles/themes/v2/colors';
import {natures} from "../json/json_data";

export function getColor(type) {
    return [Colors[type]]
}

const Nature = () => {
    const {state} = useContext(Context);
    const [naturesList, setNaturesList] = useState(natures);
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(() => {
        setNaturesList(natures)
    }, [natures]);

    function searchList(name) {
        if (name === '' || name === undefined || !name) {
            setNaturesList(natures);
        }
        const filteredList = natures.filter(move => natures.includes(name) || natures.includes(name.toLowerCase()));
        (filteredList);
    }

    function toggleSearch() {
        searchList('');
        setSearchOpen(!searchOpen);
    }

    function GetType({types: type}) {
        let colors1 = getColor(type)
        return (<View style={{flexDirection: 'row'}}>
            <View style={[styles.types, {backgroundColor: colors1[0], borderColor: colors1[1]}]}>

                <ListItem.Subtitle style={styles.textTypes}>
                    {type.toUpperCase()}
                </ListItem.Subtitle>
            </View>
        </View>)
    }

    function renderItem({item: nature}) {
        return (<ListItem containerStyle={[styles.cardStyle, {backgroundColor: state.theme.colors.card}]}>
            <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{}}>
                    <ListItem.Title style={[styles.ListTitle, {color: state.theme.colors.text}]}>
                        {nature.name}
                    </ListItem.Title>
                </View>
                <View style={{width: 100, flexDirection: 'column'}}>
                    <Text style={{
                        fontSize: 20,
                        color: state.theme.colors.text
                    }}>
                        {nature.summary === '' ? 'Neutro' : <>
                            <Text
                                style={{color: 'red', fontWeight: 'bold'}}>{nature.summary.split(',')[0]}
                            </Text>
                            <Text
                                style={{color: 'blue', fontWeight: 'bold'}}>{nature.summary.split(',')[1]}
                            </Text>
                        </>}
                    </Text>
                </View>
            </ListItem.Content>
        </ListItem>)
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
                <TextInput placeholder='Pesquise por nome!' placeholderTextColor={state.theme.colors.text}
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
        {natures.length ? (<>
            <FlatList
                data={naturesList}
                renderItem={renderItem}
                keyExtractor={(nature) => nature.name}
                maxToRenderPerBatch={30}

            />
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
        </>) : <LoadingScreen/>}
    </View>);
}
const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 20, margin: 5, elevation: 3
    }, ListTitle: {
        paddingBottom: 5, fontSize: 25, textTransform: 'capitalize'
    }, avatar: {
        borderRadius: 20, borderWidth: 6, alignItems: 'flex-start',
    }, types: {
        borderRadius: 10, padding: 8, borderWidth: 1, marginRight: 5, elevation: 1,
    }, textTypes: {
        fontSize: 15, color: '#ffffff', fontWeight: 'bold', textShadowColor: '#646464', textShadowRadius: 1
    }
})
export default Nature