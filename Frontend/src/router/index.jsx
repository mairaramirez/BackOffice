import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Home
import Landing from '../features/home/Landing.jsx'

// MYR
import MyrMenu from '../features/myr/Menu.jsx'
import MyrNuevoUsuario from '../features/myr/user/NuevoUsuario.jsx'

// Service Home
// Service Home
import ShMenu from '../features/service-home/Menu.jsx'
import ShNuevoUsuario from '../features/service-home/users/NuevoUsuario.jsx'

// Turnos (sub-feature de Service Home)
import TurnosServicios from '../features/service-home/turnos/tabla/TurnosServicios.jsx'
import TurnoNuevo from '../features/service-home/turnos/nuevoTurno/TurnoNuevo.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/myr',
    element: <MyrMenu />,
  },
  {
    path: '/myr/nuevo-usuario',
    element: <MyrNuevoUsuario />,
  },
  {
    path: '/service-home',
    element: <ShMenu />,
  },
  {
    path: '/service-home/nuevo-usuario',
    element: <ShNuevoUsuario />,
  },
  {
    path: '/service-home/turnos',
    element: <TurnosServicios />,
  },
  {
    path: '/service-home/nuevo-turno',
    element: <TurnoNuevo />,
  },
])

export default router
