Contexto
Proyecto React + Vite (JSX). Ya existen las rutas:

/src/views/myr/NuevoUsuario.jsx

/src/views/serviceHome/NuevoUsuario.jsx
También existe el componente BackButton.jsx.

Objetivo

Re-stilar las pantallas “Nuevo usuario” de MYR y Service Home para que queden como los mockups: marco con esquinas redondeadas, título centrado “ALTA USUARIO”, botón volver en la esquina superior derecha dentro del mismo contenedor, y un slot de logo arriba a la izquierda.

No modificar lógica ni nombres de campos; sólo estructura/estilos.

Añadir CSS Modules dedicados por vista con la paleta correspondiente.

Mantener el botón Guardar al pie.

Acciones

1) Crear CSS Module para MYR

Crear archivo: src/views/myr/NuevoUsuario.module.css con este contenido:

:root {
--navy: #3D5568;        /* títulos / bordes */
--field-bg: #E3E1DC;    /* gris muy suave para inputs (puede variar) */
--field-fill: #CFE1F0;  /* celeste de MYR (similar #AFCEDF suavizado) */
--paper: #FAF7F2;       /* fondo */
--radius-xl: 22px;
}

.card {
background: var(--paper);
border: 2px solid #10182025;
border-radius: var(--radius-xl);
padding: 28px 28px 20px;
max-width: 920px;
margin: 24px auto;
position: relative;
box-shadow: 0 2px 10px #0000000a;
}

.header {
display: grid;
grid-template-columns: 180px 1fr 56px;
align-items: center;
margin-bottom: 16px;
column-gap: 8px;
}

/* Slot de logo: sólo poné background-image en línea o por tema */
.logo {
width: 160px;
height: 110px;
background-repeat: no-repeat;
background-size: contain;
background-position: left center;
/* Ejemplo: background-image: url("/logos/myr.png"); */
}

.title {
text-align: center;
font-size: 28px;
letter-spacing: .18em;
color: var(--navy);
font-weight: 800;
}

.back {
justify-self: end;
}

.grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 18px 22px;
margin-top: 8px;
}

.field {
display: flex;
flex-direction: column;
gap: 6px;
}

.label {
font-size: 12px;
letter-spacing: .18em;
color: var(--navy);
}

.input {
height: 36px;
border-radius: 10px;
border: 0;
background: #D9E7F3; /* variante celeste “relleno” */
outline: 2px solid #3D556820;
padding: 0 12px;
}

.input:focus {
outline-color: var(--navy);
}

.inputLong { grid-column: 1 / -1; } /* filas enteras (Dirección / Email) */

.actions {
display: flex;
justify-content: center;
margin-top: 18px;
}

.primary {
background: var(--navy);
color: white;
border: 0;
padding: 10px 20px;
border-radius: 12px;
font-weight: 600;
cursor: pointer;
}

.footNote {
margin-top: 14px;
text-align: center;
font-size: 10px;
letter-spacing: .12em;
color: #6b7b86;
}

2) Actualizar src/views/myr/NuevoUsuario.jsx

Reemplazar su JSX por una estructura con grid + clases del module; no cambiar nombres de estados ni handlers existentes. Suponer que el formulario ya tiene controladores; sólo envolver inputs actuales con las clases. Ejemplo (adaptar imports y conservar lógica actual):

import React from 'react'
import BackButton from '../../components/BackButton.jsx'
import s from './NuevoUsuario.module.css'

export default function NuevoUsuarioMYR() {
return (
<div className={s.card}>
<div className={s.header}>
<div className={s.logo} aria-label="Logo MYR" />
<h1 className={s.title}>ALTA USUARIO</h1>
<BackButton className={s.back} to="/myr" />
</div>

      <form>
        <div className={s.grid}>
          <div className={s.field}>
            <label className={s.label} htmlFor="fecha">FECHA</label>
            <input id="fecha" name="fecha" className={s.input} type="date" />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="ncontrato">N° CONTRATO</label>
            <input id="ncontrato" name="ncontrato" className={s.input} />
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="apellido">APELLIDO</label>
            <input id="apellido" name="apellido" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="promotor">PROMOTOR</label>
            <input id="promotor" name="promotor" className={s.input} />
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="dni">DNI/CI/LC</label>
            <input id="dni" name="dni" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="nacimiento">FECHA DE NACIMIENTO</label>
            <input id="nacimiento" name="nacimiento" className={s.input} type="date" />
          </div>

          <div className={`${s.field} ${s.inputLong}`}>
            <label className={s.label} htmlFor="direccion">DIRECCION</label>
            <input id="direccion" name="direccion" className={s.input} />
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="cp">CODIGO POSTAL</label>
            <input id="cp" name="cp" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="localidad">LOCALIDAD</label>
            <input id="localidad" name="localidad" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="provincia">PROVINCIA</label>
            <input id="provincia" name="provincia" className={s.input} />
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="prefijo">PREFIJO</label>
            <input id="prefijo" name="prefijo" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="telefono">TELEFONO</label>
            <input id="telefono" name="telefono" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="movil">TELEFONO MOVIL</label>
            <input id="movil" name="movil" className={s.input} />
          </div>

          <div className={`${s.field} ${s.inputLong}`}>
            <label className={s.label} htmlFor="email">EMAIL</label>
            <input id="email" name="email" className={s.input} type="email" />
          </div>
        </div>

        <div className={s.actions}>
          <button type="submit" className={s.primary}>Guardar</button>
        </div>

        <p className={s.footNote}>
          Quien manifieste libremente su consentimiento de quedar adherido al contrato de servicios que ofrece SERVICE HOME
          dispone a ABONADO/A y quedando sujeto a las siguientes clausulas:
        </p>
      </form>
    </div>
)
}

3) Crear CSS Module para Service Home

Crear src/views/serviceHome/NuevoUsuario.module.css con la misma estructura que el de MYR pero ajustando la paleta (acento dorado/marrón y bordes más suaves):

:root {
--navy: #3D5568;       /* títulos */
--accent: #8C6B3C;     /* marrón/dorado de Service */
--paper: #FAF7F2;
--radius-xl: 22px;
}

.card {
background: var(--paper);
border: 2px solid #a6813a55;
border-radius: var(--radius-xl);
padding: 28px 28px 20px;
max-width: 920px;
margin: 24px auto;
position: relative;
box-shadow: 0 2px 10px #0000000a;
}

.header {
display: grid;
grid-template-columns: 180px 1fr 56px;
align-items: center;
margin-bottom: 16px;
column-gap: 8px;
}

.logo {
width: 160px;
height: 110px;
background-repeat: no-repeat;
background-size: contain;
background-position: left center;
/* Ejemplo: background-image: url("/logos/service-home.png"); */
}

.title {
text-align: center;
font-size: 28px;
letter-spacing: .18em;
color: #111;
font-weight: 800;
}

.back { justify-self: end; }

.grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 18px 22px;
}

.field { display: flex; flex-direction: column; gap: 6px; }
.label {
font-size: 12px;
letter-spacing: .18em;
color: var(--navy);
}

.input {
height: 36px;
border-radius: 10px;
border: 0;
background: #B08E5C33;          /* relleno marrón suave */
outline: 2px solid #8C6B3C30;    /* línea */
padding: 0 12px;
}
.input:focus { outline-color: var(--accent); }
.inputLong { grid-column: 1 / -1; }

.actions { display: flex; justify-content: center; margin-top: 18px; }
.primary {
background: var(--accent);
color: white;
border: 0;
padding: 10px 20px;
border-radius: 12px;
font-weight: 600;
cursor: pointer;
}
.footNote {
margin-top: 14px;
text-align: center;
font-size: 10px;
letter-spacing: .12em;
color: #7a6b57;
}

4) Actualizar src/views/serviceHome/NuevoUsuario.jsx

Reemplazar su JSX por la misma estructura visual (mantener nombres/handlers actuales). Ejemplo:

import React from 'react'
import BackButton from '../../components/BackButton.jsx'
import s from './NuevoUsuario.module.css'

export default function NuevoUsuarioService() {
return (
<div className={s.card}>
<div className={s.header}>
<div className={s.logo} aria-label="Logo Service Home" />
<h1 className={s.title}>ALTA USUARIO</h1>
<BackButton className={s.back} to="/service-home" />
</div>

      <form>
        <div className={s.grid}>
          {/* FECHA / CONTRATO */}
          <div className={s.field}>
            <label className={s.label} htmlFor="fecha">FECHA</label>
            <input id="fecha" name="fecha" className={s.input} type="date" />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="ncontrato">N° CONTRATO</label>
            <input id="ncontrato" name="ncontrato" className={s.input} />
          </div>

          {/* APELLIDO / PROMOTOR */}
          <div className={s.field}>
            <label className={s.label} htmlFor="apellido">APELLIDO</label>
            <input id="apellido" name="apellido" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="promotor">PROMOTOR</label>
            <input id="promotor" name="promotor" className={s.input} />
          </div>

          {/* DNI / NACIMIENTO */}
          <div className={s.field}>
            <label className={s.label} htmlFor="dni">DNI/CI/LC</label>
            <input id="dni" name="dni" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="nacimiento">FECHA DE NACIMIENTO</label>
            <input id="nacimiento" name="nacimiento" className={s.input} type="date" />
          </div>

          {/* DIRECCION (full) */}
          <div className={`${s.field} ${s.inputLong}`}>
            <label className={s.label} htmlFor="direccion">DIRECCION</label>
            <input id="direccion" name="direccion" className={s.input} />
          </div>

          {/* CP / LOCALIDAD / PROVINCIA */}
          <div className={s.field}>
            <label className={s.label} htmlFor="cp">CODIGO POSTAL</label>
            <input id="cp" name="cp" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="localidad">LOCALIDAD</label>
            <input id="localidad" name="localidad" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="provincia">PROVINCIA</label>
            <input id="provincia" name="provincia" className={s.input} />
          </div>

          {/* PREFIJO / TEL / MOVIL */}
          <div className={s.field}>
            <label className={s.label} htmlFor="prefijo">PREFIJO</label>
            <input id="prefijo" name="prefijo" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="telefono">TELEFONO</label>
            <input id="telefono" name="telefono" className={s.input} />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor="movil">TELEFONO MOVIL</label>
            <input id="movil" name="movil" className={s.input} />
          </div>

          {/* EMAIL (full) */}
          <div className={`${s.field} ${s.inputLong}`}>
            <label className={s.label} htmlFor="email">EMAIL</label>
            <input id="email" name="email" className={s.input} type="email" />
          </div>
        </div>

        <div className={s.actions}>
          <button type="submit" className={s.primary}>Guardar</button>
        </div>

        <p className={s.footNote}>
          Quien manifieste libremente su consentimiento de quedar adherido al contrato de servicios que ofrece SERVICE HOME
          dispone a ABONADO/A y quedando sujeto a las siguientes clausulas:
        </p>
      </form>
    </div>
)
}

5) Notas

No crear rutas nuevas. Reusar las existentes.

No cambiar nombres de estados/handlers; si el archivo original ya los tiene, mapear los value/onChange en los inputs donde corresponda.

El BackButton debe quedar dentro del contenedor usando className={s.back}.

El slot de logo se estiliza con background-image desde CSS o tema; dejarlo sin URL por defecto.

Mantener accesibilidad básica: label htmlFor + id coherentes.

Fin del prompt.