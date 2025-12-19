import React, { useCallback } from 'react'
import BackButton from '@/components/common/BackButton.jsx'
import TurnosTabla from './TurnosTabla.jsx'
import { Store, KEYS } from '@/services/dataStore.js';
import Card from '@/components/common/Card.jsx';
import CardLink from '@/components/common/CardLink.jsx'



// Nota: Mantenemos TurnosTabla tal cual. Aquí sólo añadimos BackButton y
// dejamos listos los borradores de handlers para crear/editar/eliminar usando Store.

export default function TurnosServicios() {
  const addTurno = useCallback((item) => {
    // ejemplo: Store.add(KEYS.serviceHomeTurnos, item)
    return Store.add(KEYS.serviceHomeTurnos, item)
  }, [])

  const updateTurno = useCallback((id, partial) => {
    return Store.update(KEYS.serviceHomeTurnos, id, partial)
  }, [])

  const removeTurno = useCallback((id) => {
    return Store.remove(KEYS.serviceHomeTurnos, id)
  }, [])

  // En una próxima iteración, estos handlers pueden pasarse como props a TurnosTabla
  // si dicha tabla los expone. Por ahora, quedan disponibles aquí para integración.

  return (
    <Card>
      <BackButton className="top-right" to="/service-home" />
      <TurnosTabla />
    </Card>
  )
}

{/* <div style={{position:'relative'}}>
      <BackButton className="top-right" to="/service-home" />
      <TurnosTabla />
    </div> */}