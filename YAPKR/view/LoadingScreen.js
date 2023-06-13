import React, {useEffect, useRef} from 'react'
import {FontAwesome5} from '@expo/vector-icons';
import {Animated, Dimensions, Easing, StyleSheet} from 'react-native';

const LoadingScreen = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimation();

        return () => {
            spinValue.setValue(0);
            spinValue.stopAnimation();
        };
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000,
                easing: Easing.quad,
                useNativeDriver: true,
            })
        ).start();
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={[style.container, {
                transform: [{rotate: spin}],
            }]}
        >
            <FontAwesome5 name={'spinner'} size={40} color={"red"}/>
        </Animated.View>
    );
};


const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
})


export default LoadingScreen