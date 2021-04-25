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
            if (plantsStoraged.length === 0) {
                setNextWatered('')
                setPlants(plantsStoraged);
                setLoading(false);
                return;
            }
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
            {
                plants.length === 0 ?
                    <View style={styles.container}>
                        <Text style={[styles.noPlantsTitle, ]}>
                            Sem plantinhas salvas!{'\n'}
                            {'😢'}
                    </Text>
                    </View>
                    :
                    <View>
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
            }
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: colors.background
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },

    spotlightImage: {
        width: 56,
        height: 56,
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        marginLeft: 24,
        fontFamily: fonts.text,

    },

    plants: {
        flex: 1,
        marginTop: 40,
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
    noPlantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginBottom: 16,
        textAlign: 'center',
    }

})