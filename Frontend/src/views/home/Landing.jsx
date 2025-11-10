import React, { useEffect, useState } from 'react'
import CardLink from '../../components/CardLink.jsx'
import '../../styles/ui.css'
import s from "./HomeWelcome.module.css";

export default function Landing(){
  const [now, setNow] = useState('')
  useEffect(()=>{
    const dtf = new Intl.DateTimeFormat('es-AR', { dateStyle:'full', timeStyle:'medium' })
    setNow(dtf.format(new Date()))
  },[])

  return (
    <div className="landing-wrap">
      <div className="landing-inner">
          <h1 className={s.title}>BIENVENIDO</h1>
          <div className={s.subtitle}>Seleccione una opción</div>

          <div className="landing-grid">
          <CardLink to="/myr">MYR</CardLink>
          <CardLink to="/service-home">Service Home</CardLink>
        </div>
        <div className="datetime" aria-live="polite">{now}</div>
      </div>
    </div>
  )
}
