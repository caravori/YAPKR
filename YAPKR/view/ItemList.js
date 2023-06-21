import React, {useContext, useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {transparent} from "react-native-paper/src/styles/themes/v2/colors";
import {Button} from "react-native-paper";
import {FontAwesome} from "@expo/vector-icons";
import {itemData} from "../json/json_data";
import {Context} from "../components/Context";
import {ListItem} from "@rneui/themed";


const ItemList = () => {
    const {state, dispatch} = useContext(Context);
    const [searchValue, setSearchValue] = useState('');
    const [item, setItemList] = useState(itemData);
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(
        () => {
            setItemList(itemData)
        }
        , [itemData]);

    function searchList(name) {
        if (name === '' || name === undefined || !name) {
            setItemList(itemData);
        }
        const filteredList = itemData.filter(item => item.name.includes(name.toLowerCase()));
        setItemList(filteredList);
    }

    function toggleSearch() {
        searchList('');
        setSearchOpen(!searchOpen);
    }

    function renderItem({item: item}) {
        return (
            <ListItem containerStyle={[styles.cardStyle, {backgroundColor: state.theme.colors.card}]}>
                <ListItem.Content style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{maxWidth: 300}}>
                        <ListItem.Title style={[styles.ListTitle, {color: state.theme.colors.text}]}>
                            {item.name}
                        </ListItem.Title>
                        <Text
                            style={{fontSize: 15, paddingBottom: 15, paddingRight: 5, color: state.theme.colors.text}}>
                            {item.effect}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image source={{uri: item.sprite}} style={{width: 50, height: 50}}/>
                    </View>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
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
                </View>
                :
                ''
            }
            <FlatList
                data={item}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
                </TouchableOpacity> : ''}
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
export default ItemList;