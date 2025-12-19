# Feature: Home

La sección **Home** funciona como punto de entrada principal de la aplicación.

## Componentes

### `Landing.jsx`
Pantalla inicial donde el usuario elige entre:
- **MYR**
- **Service Home**

Incluye fecha/hora en tiempo real y acceso directo a cada módulo.

### `Dashboard.jsx` (si aplica)
Pantalla de bienvenida o resumen (placeholder). Puede expandirse con métricas.

## Estilos
- `index.module.css`: estilos compartidos del feature.
- `HomeWelcome.module.css`: estilos específicos para Landing.

## Exports
`index.js` exporta los componentes principales para importar el módulo fácilmente.

## Responsabilidad del Feature
- Presentación inicial.
- Navegación a módulos principales.
- No contiene lógica de negocio.
