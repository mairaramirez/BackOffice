# Feature: MYR

Módulo destinado a la gestión de usuarios para el área **MYR Construcciones**.

## Submódulos

### 📂 `user/`
Pantallas relacionadas al ciclo de vida de los usuarios MYR.

#### `NuevoUsuario.jsx`
Formulario completo para registrar un nuevo usuario MYR.

- Manejo de formulario vía FormData.
- Guarda en `dataStore` (mock).
- Redirección automática al terminar.

#### `MYRNuevoUsuario.module.css`
Estilos encapsulados del formulario.

### 📄 `Menu.jsx`
Pantalla de menú del módulo MYR.
Permite acceder a:
- Alta de usuario (por ahora)

### `index.js`
Reexporta los módulos para importaciones limpias.

## Responsabilidad del Feature
- Administrar el flujo de alta de usuarios MYR.
- Proveer pantallas limpias y separadas por dominio.
- Preparado para más acciones (baja, edición, listado, etc.).
