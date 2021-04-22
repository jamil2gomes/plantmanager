import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Header from '../components/Header';
import EnviromentButton from '../components/EnviromentButton';
import api from '../services/api';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Load from '../components/Load';

interface EnvironmentsProps {
    key:string;
    title: string;
}

interface PlantsProps {
    id:string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency:{
        times: number;
        repeat_every: string;
    }
}

const PlantSelection:React.FC = () => {
    const [environments, setEnvironments] = useState<EnvironmentsProps[]>([])
    const [active, setActive] = useState('all')
    const [loading, setLoading] = useState(true);
    const [plants, setPlants] = useState<PlantsProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([])

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);
    const [loadedAll, setLoadedAll] = useState(false);

    useEffect(() => {

        async function fetchEnviroment () {
            const {data} = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);

        }

        fetchEnviroment();
       
        return () => {}
    }, [])


    useEffect(() => {
        fetchPlants();      
        return () => {}
    }, [])

    async function fetchPlants () {
        const {data} = await api.get(`plants?_sort=name&_order=asc?_page=${page}&_limit=8`);

        if(!data){
            return setLoading(true);
        }

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }
        setLoadingMore(false);
        setLoading(false);
    }


    function handleEnviromentSelected(environment: string){
        setActive(environment);

        if(environment === "all")
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant => plant.environments.includes(environment));
        setFilteredPlants(filtered);
    }

    function handleFetchMore(distance:number){
        if(distance < 1) return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    if(loading)
        return <Load/>

    return (
        <View style={styles.container}>
          <View style={styles.header}>
          <Header/>
           <Text style={styles.title}>
               Em qual ambiente
           </Text>
           <Text style={styles.subtitle}>
               você quer colocar sua planta?
           </Text>
          </View>

          <View>
              <FlatList
                data={environments}
                renderItem = {({item}) =>(
                    <EnviromentButton 
                     title={item.title} 
                     key={item.key} 
                     active={item.key === active}
                     onPress={()=>handleEnviromentSelected(item.key)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
              />
          </View>

          <View style={styles.plants}>
              <FlatList
                data={filteredPlants}
                renderItem = {({item}) =>(
                    <PlantCardPrimary data={item}/>
                )}
               
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.plantsList}
                numColumns={2}
                onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    loadingMore ? <ActivityIndicator color={colors.green}/> : <></>
                }
              />
          </View>
        </View>


    )
}

export default PlantSelection;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
    },

    header: {
       paddingHorizontal: 30
    },

  
    title: {
        fontFamily: fonts.heading,
        marginTop: 15,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    enviromentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },

    plants:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },

    plantsList:{

    }

})