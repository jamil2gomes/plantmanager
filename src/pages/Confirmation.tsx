import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { TextInput } from 'react-native-gesture-handler';

interface Params{
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;

}

const emojis = {
    hug: '🤗',
    smile: '😄',
}

export default function Confirmation() {

    const {navigate} = useNavigation();
    const {params} = useRoute();
    const {title, subtitle,buttonTitle, icon, nextScreen} = params as Params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                  {title}
                </Text>

                <Text style={styles.subtitle}>
                   {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button titulo={buttonTitle} onPress={()=> navigate(nextScreen)}/>
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
        marginTop:20,
        height: 60

    },
})
