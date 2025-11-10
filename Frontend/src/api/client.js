const base = '/api'
export const api = {
  listAppointments: async ()=> (await fetch('/src/mocks/appointments.json')).json(),
  listContracts: async ()=> (await fetch('/src/mocks/contracts.json')).json(),
  listUsers: async (tipo)=> (await fetch('/src/mocks/users.json')).json(),
  // placeholders para POST/PUT/DELETE a implementar luego vs Node/Express:
  createContract: async (payload)=> ({ ok:true, id:'tmp', payload }),
}
export default api
