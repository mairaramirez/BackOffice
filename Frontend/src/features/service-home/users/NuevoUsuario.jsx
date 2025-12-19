import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../components/common/BackButton.jsx'
import { Store, KEYS } from '@/services/dataStore.js';
import './NuevoUsuario.module.css'
import CardLink from '@/components/common/CardLink.jsx'
import s from './NuevoUsuario.module.css'



export default function NuevoUsuario(){
    const navigate = useNavigate()

    const onSubmit = (e)=>{
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const data = Object.fromEntries(fd.entries())
        const payload = { id: Date.now().toString(), fuente:'ServiceHome', ...data }
        Store.add(KEYS.serviceHomeUsers, payload)
        alert('Guardado (mock)')
        navigate(-1)
    }

    return (
        <div className={s.card}>
            <div className={s.header}>
                <div className="logo" aria-label="Logo Service Home" />
                <h1 className="title">ALTA USUARIO</h1>
                <BackButton className="back" to="/service-home" />
            </div>

            <form onSubmit={onSubmit}>
                <div className={s.grid}>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="fecha">FECHA</label>
                        <input className={s.input} id="fecha" name="fecha" type="date" required />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="contrato">N° CONTRATO</label>
                        <input className={s.input} id="contrato" name="contrato" type="text" required />
                    </div>

                    <div className={s.field}>
                        <label className={s.label} htmlFor="apellido">APELLIDO</label>
                        <input className={s.input} id="apellido" name="apellido" type="text" required />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="promotor">PROMOTOR</label>
                        <input className={s.input} id="promotor" name="promotor" type="text" />
                    </div>

                    <div className={s.field}>
                        <label className={s.label} htmlFor="documento">DNI/CI/LC</label>
                        <input className={s.input} id="documento" name="documento" type="text" required />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="nacimiento">FECHA DE NACIMIENTO</label>
                        <input className={s.input} id="nacimiento" name="nacimiento" type="date" />
                    </div>

                    <div className={`${s.field} ${s.inputLong}`}>
                        <label className={s.label} htmlFor="direccion">DIRECCION</label>
                        <input className={s.input} id="direccion" name="direccion" type="text" />
                    </div>

                    <div className={s.field}>
                        <label className={s.label} htmlFor="cp">CODIGO POSTAL</label>
                        <input className={s.input} id="cp" name="cp" type="text" />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="localidad">LOCALIDAD</label>
                        <input className={s.input} id="localidad" name="localidad" type="text" />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="provincia">PROVINCIA</label>
                        <input className={s.input} id="provincia" name="provincia" type="text" />
                    </div>

                    <div className={s.field}>
                        <label className={s.label} htmlFor="prefijo">PREFIJO</label>
                        <input className={s.input} id="prefijo" name="prefijo" type="text" />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="telefono">TELEFONO</label>
                        <input className={s.input} id="telefono" name="telefono" type="tel" />
                    </div>
                    <div className={s.field}>
                        <label className={s.label} htmlFor="movil">TELEFONO MOVIL</label>
                        <input className={s.input} id="movil" name="movil" type="tel" />
                    </div>

                    <div className="field inputLong">
                        <label className={s.label} htmlFor="email">EMAIL</label>
                        <input className={s.input} id="email" name="email" type="email" />
                    </div>
                </div>

                <div className={s.actions}>
                    <button className={s.primary} type="submit">Guardar</button>
                </div>

                <p className={s.footNote}>
                    Quien manifieste libremente su consentimiento de quedar adherido al contrato de servicios que ofrece SERVICE HOME
                    dispone a ABONADO/A y quedando sujeto a las siguientes clausulas:
                </p>
            </form>
        </div>
    )
}