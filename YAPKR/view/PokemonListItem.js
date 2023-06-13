import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Colors } from '../Styles';
import { Avatar, ListItem } from '@rneui/themed';

const PokemonListItem = ({pokemon}) => {
    function getColor(type) {
        return [Colors[type], Colors[type + "b"]];
      }
      function GetTypes({ types: types }) {
        let colors1 = getColor(types[0].type.name);
        let colors2;
        if (types[1] !== undefined) {
          colors2 = getColor(types[1].type.name);
    
          return (
            <View style={{ flexDirection: "row" }}>
              <View
                style={[
                  styles.types,
                  { backgroundColor: "#00000026", borderWidth: 0 },
                ]}
              >
                <ListItem.Subtitle style={styles.textTypes}>
                  {types[0].type.name.toUpperCase()}
                </ListItem.Subtitle>
              </View>
    
              <View
                style={[
                  styles.types,
                  { backgroundColor: colors2[0], borderColor: colors2[1] },
                ]}
              >
                <ListItem.Subtitle style={styles.textTypes}>
                  {types[1].type.name.toUpperCase()}
                </ListItem.Subtitle>
              </View>
            </View>
          );
        } else {
          return (
            <View
              style={[
                styles.types,
                { backgroundColor: colors1[0], borderColor: colors1[1] },
              ]}
            >
              <ListItem.Subtitle style={styles.textTypes}>
                {types[0].type.name.toUpperCase()}
              </ListItem.Subtitle>
            </View>
          );
        }
      }
      let colors = getColor(pokemon.types[0].type.name);
      return (
        <ListItem
          containerStyle={[
            styles.cardStyle,
            { backgroundColor: colors[0], borderColor: colors[1] },
          ]}
        >
          <View
            style={[
            ]}
          >
            <Avatar
              size={100}
              source={{
                uri: pokemon.sprites.other["official-artwork"].front_default,
              }}
            />
          </View>
          <ListItem.Content>
            <ListItem.Title
              style={[styles.ListTitle, { color: "black" }]}
            >
              {pokemon.name}
            </ListItem.Title>
            <GetTypes types={pokemon.types} />
          </ListItem.Content>
        </ListItem>
      )
}

const styles = StyleSheet.create({
    cardStyle: {borderRadius: 20, margin: 8},
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
    },
    textTypes: {
        color: 'black',
        fontWeight: 'bold'
    }
  }
  )

export default PokemonListItem