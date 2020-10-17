import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'
import mapAPIURL from "../utils/mapAPIURL";
import api from '../services/api';
import Orphanage from '../interfaces/Orphanage';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    // metade!
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})


const OrphanagesMap = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/orphanages')
            console.log(res.data)
            setOrphanages(res.data)
        }
        fetchData()
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Curitibanos</strong>
                    <span>SC</span>
                </footer>
            </aside>

            <Map
                center={[-27.281694, -50.584492]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}>
                <TileLayer url={mapAPIURL} />
                {
                    orphanages.map(o => (
                        <Marker
                            key={o.id}
                            position={[o.latitude, o.longitude]}
                            icon={mapIcon}>
                            <Popup
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                                closeButton={false}>{o.name}
                                <Link to={"orphanages/" + o.id}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    ))
                }
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap