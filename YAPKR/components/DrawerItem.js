import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { Text } from "react-native";
import Style from "../Styles";

const CustomDrawerItem = (props) => {
    const { state } = props;

    return (
        <DrawerItem
            label={() => <Text style={[Style.Text, { color: state.theme.colors.text }]}>{props.label}</Text>}
            onPress={props.onPress}
        />
    );
};

export default CustomDrawerItem;
