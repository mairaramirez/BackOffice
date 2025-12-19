// src/api/usersApi.js
import http from './http.js';

export const usersApi = {
  list: () => http('/users'),
  create: (data) => http('/users', { method: 'POST', body: data }),
  update: (id, d) => http(`/users/${id}`, { method: 'PUT', body: d }),
  remove: (id) => http(`/users/${id}`, { method: 'DELETE' }),
};
