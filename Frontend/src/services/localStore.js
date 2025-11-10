// localStore.js - simple helpers to persist Service Home turnos in localStorage
// This keeps the contract aligned with README: key "serviceHome.turns"
// While the app uses turnosService as the primary API, these helpers allow
// easy swaps to JSON file or API later.

const KEY = 'serviceHome.turns'

export function loadTurns(){
  try{
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  }catch(_){
    return []
  }
}

export function saveTurns(list){
  try{
    const safe = Array.isArray(list) ? list : []
    localStorage.setItem(KEY, JSON.stringify(safe))
    return true
  }catch(_){ return false }
}
