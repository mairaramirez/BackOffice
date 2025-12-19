import React from 'react'
import BackButton from '@/components/common/BackButton.jsx'
import CardLink from '@/components/common/CardLink.jsx'

import '../../styles/ui.css'

export default function Menu() {
  return (
    <div className="landing-wrap">
      <div className="landing-inner" style={{ position: 'relative' }}>
        <BackButton className="top-right" to="/" />
        <h1>Service Home</h1>

        <div className="landing-grid">
          <CardLink to="/service-home/nuevo-usuario">
            Alta de cliente
          </CardLink>

          <CardLink to="/service-home/nuevo-turno">
            Nuevo turno
          </CardLink>

          <CardLink to="/service-home/turnos">
            Turnos de servicios
          </CardLink>
        </div>
      </div>
    </div>
  )
}
