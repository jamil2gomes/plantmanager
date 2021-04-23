import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    },

    dateTimeNotification: Date
}

interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
    }
}

export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            }));

    } catch (error) {
        throw new Error(error);
    }
}


export async function loadPlant(): Promise<PlantProps[]> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plantas = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const plantsSorted = Object.keys(plantas)
            .map(key => {
                return {
                    ...plantas[key].data,
                    hour: format(new Date(plantas[key].data.dateTimeNotification), 'HH:mm'),
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            );
        return plantsSorted;

    } catch (error) {
        throw new Error(error);
    }
}