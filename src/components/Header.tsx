import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import colors from '../styles/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Entypo as Icon } from '@expo/vector-icons';
import profileUser from '../assets/profile-user.png';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';

export default function Header() {

    const [userName, setUserName] = useState<string>();

    async function handleLogOut(){
        try {
            
        } catch (error) {
            
        }
    }

    useEffect(() => {

        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }
        loadStorageUserName();
    }, [userName])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <View style={styles.containerUser}>
                <Image source={profileUser} style={styles.image} />
                <RectButton style={styles.containerUserLogOut} onPress={()=>{}}>
                <Icon name="log-out"  />
                    <Text>
                     Sair
                    </Text>
                </RectButton>
            </View>
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
        marginTop:getStatusBarHeight(),
    },

    containerUser: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    containerUserLogOut: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
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
