// Simple data store abstraction with a MockStore based on localStorage
// Para usar API, cambia export { ApiStore as Store }

const genId = ()=> Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,8)

const KEYS = {
  serviceHomeUsers: 'serviceHomeUsers',
  myrUsers: 'myrUsers',
  serviceHomeObservaciones: 'serviceHomeObservaciones',
  serviceHomeTurnos: 'serviceHomeTurnos',
}

function read(key){
  try{
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  }catch(e){
    console.error('MockStore read error', e)
    return []
  }
}
function write(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)) }
  catch(e){ console.error('MockStore write error', e) }
}

export const MockStore = {
  getAll(key){
    return read(key)
  },
  add(key, item){
    const list = read(key)
    const id = item.id ?? genId()
    const next = { ...item, id }
    list.push(next)
    write(key, list)
    return next
  },
  update(key, id, partial){
    const list = read(key)
    const idx = list.findIndex(it=> it.id === id)
    if(idx === -1) return null
    const updated = { ...list[idx], ...partial, id }
    list[idx] = updated
    write(key, list)
    return updated
  },
  remove(key, id){
    const list = read(key)
    const next = list.filter(it=> it.id !== id)
    write(key, next)
    return true
  }
}

export const ApiStore = {
  // TODO: replace with real HTTP calls (fetch/axios)
  getAll(key){
    console.warn('ApiStore.getAll not implemented for', key)
    return []
  },
  add(key, item){
    console.warn('ApiStore.add not implemented for', key, item)
    return { ...item, id: item.id ?? genId() }
  },
  update(key, id, partial){
    console.warn('ApiStore.update not implemented for', key, id, partial)
    return { id, ...partial }
  },
  remove(key, id){
    console.warn('ApiStore.remove not implemented for', key, id)
    return true
  }
}

export { MockStore as Store, KEYS }
