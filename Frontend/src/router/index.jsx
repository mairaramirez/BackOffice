import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Home
import Landing from '../views/home/Landing.jsx'

// MYR
import MyrMenu from '../views/myr/Menu.jsx'
import MyrNuevoUsuario from '../views/myr/NuevoUsuario.jsx'

// Service Home
import ShMenu from '../views/serviceHome/Menu.jsx'
import ShNuevoUsuario from '../views/serviceHome/NuevoUsuario.jsx'
import TurnosServicios from '../views/turnos/TurnosServicios.jsx'
import TurnoNuevo from '../views/turnos/TurnoNuevo.jsx'

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
