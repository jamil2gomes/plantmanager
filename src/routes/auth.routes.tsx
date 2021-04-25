import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../styles/colors';
import Welcome from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import AuthRoutes from './tabs.routes';
import StackRoutes from './stack.routes';

const Routes = createStackNavigator();

const InitialRoutes: React.FC = () => (

    <NavigationContainer>
        <Routes.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white
                }
            }}
        >
            <Routes.Screen name="Welcome" component={Welcome} />
            <Routes.Screen name="UserIdentification" component={UserIdentification} />
            <Routes.Screen name="StackRoutes" component={StackRoutes} />
        </Routes.Navigator>
    </NavigationContainer>
)

export default InitialRoutes;

