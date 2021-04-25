import React, { useEffect, useState } from 'react';
import Routes from "./src/routes";
import InitialRoutes from './src/routes/auth.routes';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [userLogged, setUserLogged] = useState<string>();
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(()=>{
    async function getUser(){
      const user = await AsyncStorage.getItem('@plantmanager:user');
      const userFound = user ?? '';
      setUserLogged(userFound);
    }
    getUser();
  },[]);

  if (!fontsLoaded)
    return <AppLoading />

  return (userLogged ? <Routes /> : <InitialRoutes/>);
}

