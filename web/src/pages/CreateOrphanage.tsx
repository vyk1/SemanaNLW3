import React, { ChangeEvent, FormEvent, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'

import { FiPlus } from "react-icons/fi"

import '../styles/pages/create-orphanage.css'
import Sidebar from "../components/Sidebar"
import mapAPIURL from "../utils/mapAPIURL"
import { LeafletMouseEvent } from "leaflet"
import mapIcon from "../utils/mapIcon"
import api from "../services/api"
import { useHistory } from "react-router-dom"

export default function CreateOrphanage() {
  const history = useHistory()

  const [pos, setPos] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, set_opening_hours] = useState('')
  const [is_open_on_weekends, set_is_open_on_weekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPos({
      latitude: lat,
      longitude: lng,
    })
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }
    const selectedImgs = Array.from(e.target.files)
    setImages(selectedImgs)

    const selectedImgsPrev = selectedImgs.map(i => URL.createObjectURL(i))
    setPreviewImages(selectedImgsPrev)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('latitude', String(pos.latitude))
    data.append('longitude', String(pos.longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('is_open_on_weekends', String(is_open_on_weekends))

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert("Cadastro realizado com sucesso!")
    history.push('/app')
  }
  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.281694, -50.584492]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url={mapAPIURL} />
              {
                pos.latitude !== 0 &&
                <Marker interactive={false} icon={mapIcon} position={[pos.latitude, pos.longitude]} />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(i => (
                    <img src={i} alt={name} key={i} />
                  ))
                }
                <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input accept=".png, .jpg, .jpeg" multiple onChange={handleSelectImages} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" value={opening_hours} onChange={e => set_opening_hours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="is_open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" onClick={() => set_is_open_on_weekends(true)} className={is_open_on_weekends ? "active" : ""}>Sim</button>
                <button type="button" onClick={() => set_is_open_on_weekends(false)} className={!is_open_on_weekends ? "active" : ""}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div >
  )
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`
