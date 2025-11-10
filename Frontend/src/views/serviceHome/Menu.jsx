import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton.jsx'
import '../../styles/ui.css'

export default function Menu(){
  const navigate = useNavigate()
  return (
    <div className="landing-wrap">
      <div className="landing-inner" style={{position:'relative'}}>
        <BackButton className="top-right" to="/" />
        <h1>Service Home</h1>
        <div className="landing-grid">
          <button className="ui-card-link" onClick={()=> navigate('/service-home/nuevo-usuario')}>Alta de cliente</button>
          <button className="ui-card-link" onClick={()=> navigate('/service-home/nuevo-turno')}>Nuevo turno</button>
          <button className="ui-card-link" onClick={()=> navigate('/service-home/turnos')}>Turnos de servicios</button>
          <span />
        </div>
      </div>
    </div>
  )
}
