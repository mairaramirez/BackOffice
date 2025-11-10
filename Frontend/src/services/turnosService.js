// turnosService.js - adapter-ready service for Service Home turnos
// Public API: list, create, update, remove, clear, setAdapter

import { STORAGE_KEYS, toISO } from '../utils/datetime.js'

const EVENT_NAME = 'turnos:changed'

function emitChanged(){
  try{ window.dispatchEvent(new CustomEvent(EVENT_NAME)) }catch(_){ /* noop for SSR/tests */ }
}

// In-memory cache
let cache = null

// LocalStorage Adapter
const LocalStorageAdapter = {
  async list(){
    if(cache) return cache
    const raw = localStorage.getItem(STORAGE_KEYS.turnos)
    cache = raw ? JSON.parse(raw) : []
    return cache
  },
  async create(item){
    const list = await this.list()
    const next = { ...item }
    list.push(next)
    cache = list
    localStorage.setItem(STORAGE_KEYS.turnos, JSON.stringify(list))
    emitChanged()
    return next
  },
  async update(id, patch){
    const list = await this.list()
    const idx = list.findIndex(it=> it.id === id)
    if(idx === -1) return null
    const updated = { ...list[idx], ...patch, id }
    list[idx] = updated
    cache = list
    localStorage.setItem(STORAGE_KEYS.turnos, JSON.stringify(list))
    emitChanged()
    return updated
  },
  async remove(id){
    const list = await this.list()
    const next = list.filter(it=> it.id !== id)
    cache = next
    localStorage.setItem(STORAGE_KEYS.turnos, JSON.stringify(next))
    emitChanged()
    return true
  },
  async clear(){
    cache = []
    localStorage.setItem(STORAGE_KEYS.turnos, JSON.stringify([]))
    emitChanged()
  }
}

let adapter = LocalStorageAdapter

export function setAdapter(next){ adapter = next || LocalStorageAdapter }

function genUUID(){
  // Not RFC4122-perfect but good enough for mock
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

async function ensureSeed(){
  try{
    const seeded = localStorage.getItem(STORAGE_KEYS.seeded)
    const list = await adapter.list()
    if((!seeded || seeded !== 'true') && (!list || list.length === 0)){
      const now = new Date()
      const d1 = new Date(now)
      d1.setDate(d1.getDate()+1); d1.setHours(9,30,0,0)
      const d2 = new Date(now)
      d2.setDate(d2.getDate()+2); d2.setHours(14,0,0,0)
      const demo = [
        { id:'seed-1', servicio:'service-home', oficio:'electricista', clienteId:'1001', datetime: toISO(d1), estado:'pendiente', createdAt: toISO(now) },
        { id:'seed-2', servicio:'service-home', oficio:'plomero',     clienteId:'2002', datetime: toISO(d2), estado:'pendiente', createdAt: toISO(now) },
      ]
      cache = demo
      localStorage.setItem(STORAGE_KEYS.turnos, JSON.stringify(demo))
      localStorage.setItem(STORAGE_KEYS.seeded, 'true')
      emitChanged()
    }
  }catch(_){ /* ignore seeding errors */ }
}

export async function list(){
  await ensureSeed()
  return adapter.list()
}

export async function create({ oficio, clienteId, datetime }){
  const nowIso = toISO(new Date())
  const item = {
    id: genUUID(),
    servicio: 'service-home',
    oficio,
    clienteId: String(clienteId),
    datetime: toISO(datetime),
    estado: 'pendiente',
    createdAt: nowIso,
  }
  return adapter.create(item)
}

export async function update(id, patch){
  return adapter.update(id, patch)
}

export async function remove(id){
  return adapter.remove(id)
}

export async function clear(){
  return adapter.clear()
}

export const events = { EVENT_NAME }
