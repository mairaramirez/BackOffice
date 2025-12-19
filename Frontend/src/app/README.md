🧩 Capa APP – Núcleo de la Aplicación
📌 Propósito

La carpeta /app contiene toda la lógica global del proyecto, incluyendo:

autenticación

estados globales

constantes de la aplicación

hooks compartidos

providers que envuelven toda la UI

Es lo que en software profesional se conoce como:

👉 Application Layer / Core Layer

📁 Estructura
app/
│ authContext.jsx      → Provider global de autenticación
│ useAuth.js           → Hook para acceder al usuario
│ globalStore.js       → Estado global (theme, layout, etc.)
│ constants.js         → Constantes del proyecto

🔥 authContext.jsx — Autenticación Global
¿Qué hace?

guarda el usuario logueado

provee login() y logout()

comparte estado a toda la app

evita pasar props manualmente

¿Por qué existe?

Porque features distintas deben saber:

quién es el usuario

qué permisos tiene

si está autenticado

Ejemplo de uso:

const { user, login } = useAuth();

🔥 useAuth.js — Hook simplificador
¿Qué hace?

Envuelve el contexto de auth para que se use fácilmente.

Sin esto tendrías que importar el context y hacer useContext() cada vez.

🔥 globalStore.js — Estado Global General
¿Qué guarda?

Estados que NO son de auth:

tema (dark mode)

sidebar abierto/cerrado

flags globales

¿Por qué existe?

Mantiene el código ordenado y modular.

🔥 constants.js — Configuración General

Guarda valores que no deben estar hardcodeados:

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

🎯 Ventaja de esta capa

mantiene la aplicación escalable

profesionaliza el proyecto

permite a cualquier dev entender la base

separa responsabilidades como en sistemas grandes