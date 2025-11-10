import { useEffect, useMemo, useState } from 'react'
import Table from '../../components/common/Table.jsx'
import Button from '../../components/common/Button.jsx'
import s from './TurnosTabla.module.css'
import * as turnos from '../../services/turnosService.js'

function formatDia(iso){
    const d = new Date(iso)
    return new Intl.DateTimeFormat('es-AR', { weekday:'long', day:'2-digit', month:'2-digit' }).format(d)
}

function toRow(item){
    const d = new Date(item.datetime)
    const diaIso = d.toISOString().slice(0,10)
    const hora = d.toTimeString().slice(0,5)
    return {
        id: item.id,
        oficio: item.oficio,
        dia: diaIso,
        hora,
        cliente: item.clienteId,
        datetime: item.datetime
    }
}

export default function TurnosTabla(){
    const [rows, setRows] = useState([])
    const [q, setQ] = useState('')
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState({})
    const [modal, setModal] = useState(null) // { type, turno }
    const pageSize = 5

    useEffect(()=>{
        let mounted = true
        async function load(){
            const data = await turnos.list()
            if(mounted) setRows(data.map(toRow))
        }
        load()
        const onChanged = ()=> load()
        window.addEventListener('turnos:changed', onChanged)
        return ()=>{ mounted = false; window.removeEventListener('turnos:changed', onChanged) }
    },[])

    const filtered = useMemo(()=>{
        const needle = q.trim().toLowerCase()
        if(!needle) return rows
        return rows.filter(r=>
            (String(r.cliente||'').toLowerCase().includes(needle)) ||
            (r.oficio||'').toLowerCase().includes(needle)
        )
    },[rows,q])

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const pageRows = filtered.slice((page-1)*pageSize, page*pageSize)
    useEffect(()=>{ if(page>totalPages) setPage(totalPages) },[totalPages])

    const columns = [
        { header:'', accessor:'id', render:(val,row)=> (
                <input type="checkbox" aria-label={`Seleccionar ${row.cliente}`} checked={!!selected[row.id]} onChange={(e)=> setSelected(prev=> ({...prev, [row.id]: e.target.checked}))} />
            )},
        { header:'Oficio', accessor:'oficio' },
        { header:'Día', accessor:'dia', render:(val)=> formatDia(val) },
        { header:'Hora', accessor:'hora' },
        { header:'Cliente', accessor:'cliente' },
    ]

    const onView = (row)=> setModal({ type:'view', turno:row })
    const onEdit = (row)=> setModal({ type:'edit', turno:row })
    const onDelete = (row)=> setModal({ type:'delete', turno:row })

    return (
        <div className={s.wrap}>
            <h1 className={s.title}>TURNOS DE SERVICIOS</h1>
            <div className={s.toolbar}>
                <input className={s.search} placeholder="Buscar por cliente u oficio" value={q} onChange={e=>{ setQ(e.target.value); setPage(1) }} aria-label="Buscar" />
                <span className={s.badge}>{filtered.length} resultados</span>
                <div className={s.pager}>
                    <Button onClick={()=> setPage(p=> Math.max(1,p-1))} disabled={page===1}>Anterior</Button>
                    <span>{page}/{totalPages}</span>
                    <Button onClick={()=> setPage(p=> Math.min(totalPages,p+1))} disabled={page===totalPages}>Siguiente</Button>
                </div>
            </div>

            <Table
                columns={columns}
                rows={pageRows}
                getKey={(r)=> r.id}
                renderActions={(row)=> (
                    <>
                        <Button variant="ghost" onClick={()=>onView(row)}>Ver</Button>
                        <Button variant="ghost" onClick={()=>onEdit(row)}>Editar</Button>
                        <Button variant="ghost" onClick={()=>onDelete(row)}>Eliminar</Button>
                    </>
                )}
            />

            {/* MODAL */}
            {modal && (
                <Modal onClose={()=> setModal(null)}>
                    {modal.type === 'view' && <ModalView turno={modal.turno} onClose={()=> setModal(null)} />}
                    {modal.type === 'edit' && <ModalEdit turno={modal.turno} onClose={()=> setModal(null)} />}
                    {modal.type === 'delete' && <ModalDelete turno={modal.turno} onClose={()=> setModal(null)} />}
                </Modal>
            )}
        </div>
    )
}

/* ============ MODALES ============ */

function Modal({ children, onClose }){
    return (
        <div style={{
            position:'fixed', top:0, left:0, width:'100%', height:'100%',
            background:'rgba(0,0,0,0.4)', display:'flex',
            alignItems:'center', justifyContent:'center', zIndex:1000
        }}>
            <div style={{
                background:'#fff', padding:'24px', borderRadius:'8px',
                minWidth:'380px', boxShadow:'0 2px 8px rgba(0,0,0,0.3)'
            }}>
                {children}
                <div style={{textAlign:'right', marginTop:'12px'}}>
                    <Button onClick={onClose}>Cerrar</Button>
                </div>
            </div>
        </div>
    )
}

function ModalView({ turno }){
    return (
        <div>
            <h2>Detalle del turno</h2>
            <p><b>Oficio:</b> {turno.oficio}</p>
            <p><b>Cliente:</b> {turno.cliente}</p>
            <p><b>Fecha:</b> {formatDia(turno.dia)}</p>
            <p><b>Hora:</b> {turno.hora}</p>
        </div>
    )
}

function ModalEdit({ turno, onClose }){
    const [oficio, setOficio] = useState(turno.oficio)
    const [fecha, setFecha] = useState(turno.dia)
    const [hora, setHora] = useState(turno.hora)

    const guardar = async ()=>{
        const nuevaFecha = new Date(`${fecha}T${hora}`)
        await turnos.update(turno.id, { oficio, datetime:nuevaFecha.toISOString() })
        onClose()
    }

    return (
        <div>
            <h2>Editar turno</h2>
            <label>Oficio</label>
            <input value={oficio} onChange={e=> setOficio(e.target.value)} style={{width:'100%', marginBottom:8}}/>
            <label>Fecha</label>
            <input type="date" value={fecha} onChange={e=> setFecha(e.target.value)} style={{width:'100%', marginBottom:8}}/>
            <label>Hora</label>
            <input type="time" value={hora} onChange={e=> setHora(e.target.value)} style={{width:'100%', marginBottom:8}}/>
            <Button onClick={guardar}>Guardar cambios</Button>
        </div>
    )
}

function ModalDelete({ turno, onClose }){
    const eliminar = async ()=>{
        await turnos.remove(turno.id)
        onClose()
    }

    return (
        <div>
            <h2>Eliminar turno</h2>
            <p>¿Seguro que deseas eliminar el turno del cliente <b>{turno.cliente}</b> ({turno.oficio})?</p>
            <Button onClick={eliminar}>Confirmar</Button>
        </div>
    )
}
