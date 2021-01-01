import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../images/map-marker.png';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import Orphanage from '../interfaces/Orphanage';
import initialPos from '../services/initialPos';


const OrphanagesMap = () => {
    const navigation = useNavigation()

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useFocusEffect(() => {
        async function fetchData() {
            const res = await api.get('/orphanages')
            setOrphanages(res.data)
        }
        fetchData()
    })

    return (

        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: initialPos.latitude,
                    longitude: initialPos.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}>
                {
                    orphanages.map(o => (
                        <Marker
                            key={o.id}
                            icon={mapMarker}
                            coordinate={{
                                latitude: o.latitude,
                                longitude: o.longitude,
                            }}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8
                            }}>
                            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(o.id)}>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{o.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
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

