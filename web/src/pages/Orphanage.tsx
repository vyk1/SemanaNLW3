import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import mapAPIURL from "../utils/mapAPIURL";
import OrphanageInterface from "../interfaces/Orphanage";
import api from "../services/api";
import { useParams } from "react-router-dom";
import OrphanageParams from "../interfaces/OrphanageParams";

export default function Orphanage() {

  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<OrphanageInterface>()
  const [loaded, setLoaded] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/orphanages/' + params.id)
      setOrphanage(res.data)
      setLoaded(true)
    }
    fetchData()
  }, [params.id])

  if (!loaded) {
    return <p>Carregando</p>
  }
  if (!orphanage) {
    return <p>Não há orfanato com este id</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {
              orphanage.images.map((i, idx) => (
                <button key={i.id} className={activeImageIndex === idx ? "active" : ""} type="button"
                  onClick={() => setActiveImageIndex(idx)}>
                  <img src={i.url} alt={orphanage.name} />
                </button>
              ))
            }
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url={mapAPIURL} />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a href={"https://google.com/maps/dir/?api=1&destination=" + orphanage.latitude + "," + orphanage.longitude}
                  target="_blank" rel="noopener noreferrer"
                >Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {/* Segunda à Sexta <br /> */}
                <p>{orphanage.opening_hours}</p>
              </div>
              {
                orphanage.is_open_on_weekends ?
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
                  :
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff6690" />
                Não atendemos <br />
                fim de semana
              </div>
              }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}