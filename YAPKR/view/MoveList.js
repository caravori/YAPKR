import React, { useContext } from 'react'
import { Context } from '../components/Context';
import { FlatList, Text, View } from 'react-native';

const Move = ({move}) => {
    const {state, dispatch} = useContext(Context);
    function renderItem({item: move}) {
        return (
            <Text>{move.name}</Text>
        )
    }

    return (
        <View>
            <FlatList
                data={state.moves}
                renderItem={renderItem}
                keyExtractor={(move) => move.id}
                maxToRenderPerBatch={30}
            />
        </View>
    );
}

export default Move