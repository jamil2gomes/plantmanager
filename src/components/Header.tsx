import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../styles/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import naruto from '../assets/naruto.png';
import fonts from '../styles/fonts';

export default function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Olá,</Text>
                <Text style={styles.userName}>Jamil</Text>
            </View>

            <Image source={naruto} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
        padding: 20
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40,

    },

    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
});
