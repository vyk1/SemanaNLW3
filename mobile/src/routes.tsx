import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator()

const Routes = () => {

    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#F2F3F5' }
                }}>
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                />

                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: (props) => <Header title="Selecione no mapa" {...props} />,
                    }}
                />

                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: (props) => <Header title="Dados do orfanato" {...props} />,
                    }}
                />

                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: (props) => <Header title="Orfanato" showCancel={false} {...props} />,
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;
