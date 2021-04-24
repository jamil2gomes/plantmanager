import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native'
import Header from '../components/Header'
import colors from '../styles/colors'
import waterDrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlants } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';
export default function MyPlants() {

    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a plants ${plant.name} ?`, [{
            text: 'Não',
            style: 'cancel'
        },
        {
            text: 'Não',
            onPress: async () => {
                try {
                    await removePlants(plant.id);
                    setPlants(oldPlants => oldPlants.filter((item) => item.id !== plant.id));
                } catch (error) {
                    Alert.alert("Erro ao remover a plantinha");
                }
            }
        }])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`)
            setPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();


    }, [])

    if (loading)
        return <Load />


    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image
                    source={waterDrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={plants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            handleRemove={() => handleRemove(item)}
                            data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    spotlightImage: {
        width: 60,
        height: 60,
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify'
    },

    plants: {
        flex: 1,
        width: '100%',
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }

})