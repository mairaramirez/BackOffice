import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton.jsx'
import s from './turnoNuevo.module.css'
import { isValidClienteId, nowRoundedTo30, todayAtStart } from '../../utils/datetime.js'
import * as turnos from '../../services/turnosService.js'

const OFICIOS = ['electricista','jardineria','pintor','plomero','gasista','herrero']

export default function TurnoNuevo(){
  const navigate = useNavigate()
  const [oficio, setOficio] = useState('')
  const [clienteId, setClienteId] = useState('')
  const initDate = useMemo(()=> nowRoundedTo30(),[])
  const [date, setDate] = useState(initDate.toISOString().slice(0,10)) // YYYY-MM-DD
  const [time, setTime] = useState(initDate.toTimeString().slice(0,5)) // HH:mm
  const [touched, setTouched] = useState({})
  const [notice, setNotice] = useState('')

  const minDate = todayAtStart().toISOString().slice(0,10)

  const isOficioValid = !!oficio
  const isClienteValid = isValidClienteId(clienteId)
  const selectedDate = useMemo(()=>{
    try{
      const [hh,mm] = time.split(':').map(Number)
      const d = new Date(date + 'T00:00:00')
      d.setHours(hh||0, mm||0, 0, 0)
      return d
    }catch(_){ return null }
  },[date,time])
  const isFechaValid = !!selectedDate && selectedDate >= todayAtStart()

  const formValid = isOficioValid && isClienteValid && isFechaValid

  const onSave = async (e)=>{
    e.preventDefault()
    setTouched({ oficio:true, clienteId:true, fecha:true })
    if(!formValid) return
    const payload = { oficio, clienteId: String(clienteId), datetime: selectedDate }
    await turnos.create(payload)
    setNotice('Turno creado')
    // limpiar campos pero mantener oficio seleccionado
    setClienteId('')
    const next = nowRoundedTo30()
    setDate(next.toISOString().slice(0,10))
    setTime(next.toTimeString().slice(0,5))
  }

  const onBack = ()=> navigate('/service-home')

  const timeOptions = useMemo(()=>{
    const opts = []
    for(let h=0; h<24; h++){
      for(let m=0; m<60; m+=30){
        const hh = String(h).padStart(2,'0')
        const mm = String(m).padStart(2,'0')
        opts.push(`${hh}:${mm}`)
      }
    }
    return opts
  },[])

  return (
    <div className={s.card}>
      <div className={s.header}>
        <h2 className={s.title}>Nuevo turno</h2>
      </div>
      <BackButton className={s.back} to="/service-home" />

        <form noValidate onSubmit={onSave}>
        <div className={s.grid}>
          <div className={s.field} style={{gridArea:'oficio'}}>
            <label htmlFor="oficio">Oficio</label>
            <select id="oficio" className={s.select}
              value={oficio}
              onChange={e=> setOficio(e.target.value)}
              onBlur={()=> setTouched(t=> ({...t, oficio:true}))}
              aria-invalid={touched.oficio && !isOficioValid}
            >
              <option value="">Seleccione oficio</option>
              {OFICIOS.map(o=> <option key={o} value={o}>{o}</option>)}
            </select>
            {touched.oficio && !isOficioValid && <span className={s.error}>Seleccione un oficio</span>}
          </div>

          <div className={s.field} style={{gridArea:'cliente'}}>
            <label htmlFor="clienteId">N.º de cliente</label>
            <input id="clienteId" className={s.input}
              placeholder="N.º de cliente"
              value={clienteId}
              onChange={e=> setClienteId(e.target.value.replace(/\D+/g,''))}
              onBlur={()=> setTouched(t=> ({...t, clienteId:true}))}
              aria-invalid={touched.clienteId && !isClienteValid}
              inputMode="numeric"
              pattern="[0-9]{4,10}"
              minLength={4}
              maxLength={10}
            />
              {touched.clienteId && clienteId !== '' && !isClienteValid && (
                  <span className={s.error}>Ingrese 4 a 10 dígitos</span>
              )}

          </div>

          <div className={s.field} style={{gridArea:'fecha'}}>
            <label htmlFor="fecha">Turno</label>
            <div style={{display:'flex', gap:12}}>
              <input type="date" id="fecha" className={s.input}
                min={minDate}
                value={date}
                onChange={e=> setDate(e.target.value)}
                onBlur={()=> setTouched(t=> ({...t, fecha:true}))}
                aria-invalid={touched.fecha && !isFechaValid}
              />
              <select id="hora" className={s.select}
                value={time}
                onChange={e=> setTime(e.target.value)}
              >
                {timeOptions.map(t=> <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {touched.fecha && !isFechaValid && <span className={s.error}>Seleccione una fecha y hora válidas</span>}
          </div>
        </div>

        {notice && <div role="status" style={{marginTop:12, color:'#3D5568'}}>{notice}</div>}

        <div className={s.actions}>
          <button type="submit" className={s.primary} disabled={!formValid}>Guardar turno</button>
          <Link to="/service-home/turnos" className={s.link} style={{display:'inline-flex', alignItems:'center', textDecoration:'none'}}>Ver turnos</Link>
        </div>
      </form>
    </div>
  )
}
