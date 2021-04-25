import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet, Image, ScrollView, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterDrop from '../assets/waterdrop.png';
import Button from '../components/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Entypo as Icon } from '@expo/vector-icons';

interface Params {
    plant: PlantProps
}
export default function PlantSave() {

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const { params } = useRoute();
    const { navigate } = useNavigation();
    const { plant } = params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(prevState => !prevState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());

            Alert.alert('Ops! ⏰', 'Escolha uma data no futuro 👀');
            return;
        }

        if (dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker((oldState) => !oldState);
    }
    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch (error) {
            Alert.alert("Aconteceu um erro ao salvar a plantinha 😢");
        }
    }

    const time = format(selectedDateTime, 'HH:mm');

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        width={150}
                        height={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterDrop}
                            style={styles.image}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>

                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário
                </Text>
                    {Platform.OS === 'android' && (
                        <RectButton
                            onPress={handleOpenDateTimePickerForAndroid}
                            style={styles.androidButton}
                        >
                            <Icon name="back-in-time" style={styles.androidButtonIcon} />
                            <Text style={styles.dateTimePickerText}>Mudar horário {time}</Text>

                        </RectButton>
                    )}

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}
                    <Button titulo="Cadastrar planta" onPress={handleSave} />

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape

    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        marginTop: 10,
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20

    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },

    image: {
        width: 56,
        height: 56,
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },

    dateTimePickerButton: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: colors.green_light
    },

    dateTimePickerText: {
        color: colors.green_dark,
        fontSize: 24,
        fontFamily: fonts.text
    },
    androidButton: {
        marginTop: '5%',
        marginBottom: '15%',
        marginHorizontal: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: 32,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    androidButtonIcon: {
        fontSize: 20,
        color: colors.green_dark,
    },
})
