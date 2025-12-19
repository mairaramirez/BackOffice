📌 API Layer – Documentación Técnica
🧩 Propósito

La carpeta /api contiene todas las funciones que permiten al frontend comunicarse con el backend.
Aquí se centraliza:

manejo de requests HTTP

endpoints organizados por recurso

funciones CRUD reutilizables

control de errores

Esta capa permite que el resto del proyecto use la API sin conocer detalles de red.

📁 Estructura
src/api/
│ http.js          → Wrapper de fetch para unificar requests
│ index.js         → Re-exporta todas las API
│ turnosApi.js     → CRUD de turnos
│ usersApi.js      → CRUD de usuarios

🔥 http.js — Request Wrapper
¿Qué hace?

Crea una función reutilizable que:

agrega automáticamente el BASE_URL

aplica headers por defecto

convierte el body a JSON

controla errores HTTP

devuelve JSON siempre

¿Por qué existe?

Para evitar repetir fetch() y sus configuraciones en cada archivo.

Ejemplo:
http('/turnos');

🔥 turnosApi.js — API de Turnos

Funciones disponibles:

list() → obtener todos los turnos

create(payload) → crear un turno

update(id, payload) → modificar un turno

remove(id) → eliminar un turno

Encapsula todos los endpoints relacionados a turnos.

🔥 usersApi.js — API de Usuarios

Funciones:

list()

create(data)

update(id, data)

remove(id)

Se usa para ambos sistemas (MYR y Service Home).
La diferencia se maneja en el payload:

await usersApi.create({
    source: 'MYR',
    ...data
});

🎯 Ventaja de esta organización

código más limpio

cambios centralizados

control de errores uniforme

más fácil conectar el backend real

cualquier desarrollador entiende rápido