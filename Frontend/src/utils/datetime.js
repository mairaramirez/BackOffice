// datetime.js - helpers for ISO formatting/parsing and storage keys

export const STORAGE_KEYS = {
  // Key aligned with README for future persistence swaps
  turnos: 'serviceHome.turns',
  seeded: 'sh_seeded',
}

export function toISO(date){
  if(!date) return ''
  try{
    const d = (date instanceof Date) ? date : new Date(date)
    return d.toISOString()
  }catch(_){ return '' }
}

export function fromISO(iso){
  try{ return new Date(iso) }catch(_){ return null }
}

export function todayAtStart(){
  const d = new Date()
  d.setHours(0,0,0,0)
  return d
}

export function nowRoundedTo30(){
  const d = new Date()
  const minutes = d.getMinutes()
  const rounded = minutes + (30 - (minutes % 30))
  d.setMinutes(rounded === 60 ? 0 : rounded, 0, 0)
  if(rounded === 60){ d.setHours(d.getHours()+1) }
  return d
}

export function isValidClienteId(val){
  return /^\d{4,10}$/.test(String(val||''))
}
