import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import CreateOrphanage from './pages/CreateOrphanage';

const { Navigator, Screen } = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen name="OrphanageDetails" component={OrphanageDetails} />
                <Screen name="CreateOrphanage" component={CreateOrphanage} />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;
