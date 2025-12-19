import React from 'react'
import BackButton from '@/components/common/BackButton.jsx'
import ServiciosView from '../turnos/ServiciosView.jsx'
import CardLink from '@/components/common/CardLink.jsx'

// Nota: No cambiamos la lógica interna de ServiciosView; sólo inyectamos el botón Volver.
// Los handlers de guardado en esa pantalla podrán usar Store.add/update
// con las keys 'serviceHomeObservaciones' según se integre en el futuro.

export default function GestionServicios(){
  return (
    <div style={{position:'relative'}}>
      <BackButton className="top-right" />
      <ServiciosView />
    </div>
  )
}
