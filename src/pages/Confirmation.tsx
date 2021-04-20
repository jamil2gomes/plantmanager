import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😄
                </Text>

                <Text style={styles.title}>
                   Prontinho
                </Text>

                <Text style={styles.subtitle}>
                   Agora vamos começar a cuidar das suas plantinhas com muito cuidado
                </Text>

                <View style={styles.footer}>
                    <Button titulo="Começar" />
               </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around'
    },

    content:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:"100%",
    },

    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
    },

    emoji:{
        fontSize:78
    },

    input:{
        borderBottomWidth:1,
        borderColor: colors.gray,
        color: colors.heading,
        width:"100%",
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center'
    },
    title:{
        fontFamily: fonts.heading,
        marginTop:15,
        fontSize:22,
        lineHeight:38,
        textAlign:'center',
        color: colors.heading
    },
    subtitle:{
        fontFamily: fonts.text,
        marginTop:15,
        fontSize:17,
        lineHeight:38,
        textAlign:'center',
        color: colors.heading,
        paddingVertical: 10,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop:20
    },
})
