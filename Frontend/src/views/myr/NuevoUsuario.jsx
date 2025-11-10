import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton.jsx'
import { Store, KEYS } from '../../services/dataStore.js'
import './MYRNuevoUsuario.css'

export default function NuevoUsuario(){
    const navigate = useNavigate()

    const onSubmit = (e)=>{
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const data = Object.fromEntries(fd.entries())
        const payload = { id: Date.now().toString(), fuente:'MYR', ...data }
        Store.add(KEYS.myrUsers, payload)
        alert('Guardado (mock)')
        navigate(-1)
    }

    return (
        <div className="card card-myr">
            <div className="header">
                <div className="logoMYR" aria-label="Logo MYR" />
                <h1 className="title">ALTA USUARIO</h1>
                <BackButton className="back" to="/myr" />
            </div>

            <form onSubmit={onSubmit}>
                <div className="grid">
                    <div className="field">
                        <label className="label" htmlFor="fecha">FECHA</label>
                        <input className="input" id="fecha" name="fecha" type="date" required />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="contrato">N° CONTRATO</label>
                        <input className="input" id="contrato" name="contrato" type="text" required />
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="apellido">APELLIDO</label>
                        <input className="input" id="apellido" name="apellido" type="text" required />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="promotor">PROMOTOR</label>
                        <input className="input" id="promotor" name="promotor" type="text" />
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="documento">DNI/CI/LC</label>
                        <input className="input" id="documento" name="documento" type="text" required />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="nacimiento">FECHA DE NACIMIENTO</label>
                        <input className="input" id="nacimiento" name="nacimiento" type="date" />
                    </div>

                    <div className="field inputLong">
                        <label className="label" htmlFor="direccion">DIRECCION</label>
                        <input className="input" id="direccion" name="direccion" type="text" />
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="cp">CODIGO POSTAL</label>
                        <input className="input" id="cp" name="cp" type="text" />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="localidad">LOCALIDAD</label>
                        <input className="input" id="localidad" name="localidad" type="text" />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="provincia">PROVINCIA</label>
                        <input className="input" id="provincia" name="provincia" type="text" />
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="prefijo">PREFIJO</label>
                        <input className="input" id="prefijo" name="prefijo" type="text" />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="telefono">TELEFONO</label>
                        <input className="input" id="telefono" name="telefono" type="tel" />
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="movil">TELEFONO MOVIL</label>
                        <input className="input" id="movil" name="movil" type="tel" />
                    </div>

                    <div className="field inputLong">
                        <label className="label" htmlFor="email">EMAIL</label>
                        <input className="input" id="email" name="email" type="email" />
                    </div>
                </div>

                <div className="actions">
                    <button className="primary" type="submit">Guardar</button>
                </div>

                <p className="footNote">
                    Quien manifieste libremente su consentimiento de quedar adherido al contrato de servicios que ofrece SERVICE HOME
                    dispone a ABONADO/A y quedando sujeto a las siguientes clausulas:
                </p>
            </form>
        </div>
    )
}
