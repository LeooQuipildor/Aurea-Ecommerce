# Limpieza de Scripts de Debug

## Archivos a ELIMINAR (temporales de debugging):

- activateAdmin.js
- checkAdmin.js
- checkConnection.js
- checkDatabases.js
- checkEnv.js
- createAdmin.js
- createAdminFinal.js
- createAdminNow.js
- createAdminViaAPI.js
- createFreshAdmin.js
- debugCreateAdmin.js
- resetAdmin.js
- resetAdminPassword.js
- seedAdmin.js
- simpleAdmin.js
- syncAdmin.js (MANTENER este, es útil)
- testLogin.js
- testLoginLocal.js
- testEmail.js

## Archivos a MANTENER:

- syncAdmin.js → Renombrar a scripts/createAdmin.js (útil para crear admin)
- seed.js → Mover a scripts/
- seedProducts.js → Mover a scripts/
- cleanOrders.js → Mover a scripts/

## Acción:

1. Crear carpeta `server/scripts/`
2. Mover archivos útiles ahí
3. Eliminar archivos temporales
4. Actualizar .gitignore si es necesario
