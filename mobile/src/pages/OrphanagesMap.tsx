import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../images/map-marker.png';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrphanagesMap = () => {
    const navigation = useNavigation()

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('CreateOrphanage')
    }

    function handleNavigateToOrphanageDetails() {
        navigation.navigate('OrphanageDetails')
    }

    return (

        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -22.9070902,
                    longitude: -43.2037672,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
            >
                <Marker
                    icon={mapMarker}
                    coordinate={{
                        latitude: -22.9070902,
                        longitude: -43.2037672,
                    }}
                    calloutAnchor={{
                        x: 2.7,
                        y: 0.8
                    }}>
                    <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Lar das meninas</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>2 orfanatos encontrados</Text>
                <TouchableOpacity style={styles.createOrphanage} onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        elevation: 3,
    },

    calloutText: {
        color: '#0089A5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3',
    },

    createOrphanage: {
        width: 56,
        height: 56,
        backgroundColor: '#15C3D6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default OrphanagesMap;

