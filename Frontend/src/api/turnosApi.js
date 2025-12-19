import { http } from './http.js';

export const turnosApi = {
    list: () =>
        http('/turnos'),

    create: (data) =>
        http('/turnos', {
            method: 'POST',
            body: data
        }),

    update: (id, data) =>
        http(`/turnos/${id}`, {
            method: 'PUT',
            body: data
        }),

    remove: (id) =>
        http(`/turnos/${id}`, {
            method: 'DELETE'
        }),
};

