# Revisión de seguridad — 2026-10-24

Repositorio: `JulianKizeno/lab-express-basic-auth`. Rama: `security/review-2026-10-24`.

## Correcciones

- CWE-943: reject object/array credentials and bound bcrypt inputs
- Correct password verification before accepting a login
- Update vulnerable dependencies: mongoose ^6.13.12, Replace LibSass/node-sass with Dart Sass

## Auditoría npm después de los cambios

| Proyecto | Críticas | Altas | Moderadas | Bajas | Total |
|---|---:|---:|---:|---:|---:|
| `starter-code` | 0 | 0 | 0 | 0 | 0 |

## Verificación

- Pruebas de regresión de seguridad (`starter-code/security-tests`): correctas.
- Inicialización de servidor (`starter-code`) con APIs reales de las dependencias y conexión de base de datos aislada: correcta.

## Límites y configuración

- La auditoría cubre el árbol npm resuelto, no demuestra ausencia de vulnerabilidades de lógica, infraestructura o servicios externos. No se ha desplegado ni fusionado este cambio.
- SCSS se compila al iniciar el servidor; reiniciar tras modificar estilos. Eliminar LibSass evita su árbol obsoleto de dependencias nativas.
