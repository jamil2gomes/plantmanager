import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';
import AuthRoutes from './tabs.routes';


const StackRoutes = createStackNavigator();

const AppRoutes:React.FC = () =>(
        <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle:{
                backgroundColor: colors.white
            }
        }}
        >
         <StackRoutes.Screen name="PlantSelection" component={AuthRoutes}/>
         <StackRoutes.Screen name="PlantSave"component={PlantSave}/>
         <StackRoutes.Screen name="MyPlants" component={AuthRoutes}/>
         <StackRoutes.Screen name="Confirmation" component={Confirmation} />
        </StackRoutes.Navigator>
     )

export default AppRoutes;


