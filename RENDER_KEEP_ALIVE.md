# Solución para Mantener Activo el Servidor en Render (Plan Gratuito)

## 🎯 Problema

En el plan gratuito de Render, el servidor se apaga automáticamente después de **15 minutos de inactividad**. Esto significa que la primera petición después de ese tiempo tardará unos 30-60 segundos en responder mientras el servidor se "despierta".

## ✅ Solución Implementada

Hemos creado un servicio **Keep-Alive** que hace un "ping" automático al servidor cada 14 minutos para mantenerlo activo.

### Archivos Modificados/Creados:

1. **`server/services/keepAlive.js`** - Nuevo servicio que hace ping periódico
2. **`server/index.js`** - Modificado para activar el servicio en producción

## 📋 Configuración en Render

Para que el servicio funcione correctamente, necesitas configurar una variable de entorno en Render:

### Pasos:

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/)
2. Selecciona tu servicio de backend
3. Ve a la pestaña **Environment**
4. Busca o agrega la variable `NODE_ENV`
5. Asegúrate de que su valor sea: `production`
6. Guarda los cambios

Render redesplegará automáticamente el servidor.

## 🔄 Cómo Funciona

1. Cuando el servidor se inicia en Render (modo producción), automáticamente activa el servicio Keep-Alive
2. El servicio hace una petición GET a la raíz del servidor (`/`) cada 14 minutos
3. Esta petición mantiene el servidor activo y evita que Render lo apague
4. En desarrollo local, el servicio NO se activa automáticamente

## 📊 Monitoreo

Puedes ver los logs del servicio en Render:

1. Ve a tu servicio en Render
2. Haz clic en la pestaña **Logs**
3. Verás mensajes como:
   ```
   🚀 Servicio Keep-Alive iniciado
   📍 URL: https://aurea-backend-col2.onrender.com
   ⏱️ Intervalo: 14 minutos
   ✅ [timestamp] Ping exitoso - Servidor activo
   ```

## ⚠️ Importante: URL del Backend

En el archivo `keepAlive.js`, asegúrate de que la URL del backend esté correcta:

```javascript
const BACKEND_URL = "https://aurea-backend-col2.onrender.com";
```

Si tu URL de Render es diferente, cámbiala en el archivo.

## 🛠️ Ajustes Opcionales

### Cambiar el Intervalo de Ping

Por defecto, el ping se hace cada 14 minutos. Puedes cambiarlo editando esta línea en `keepAlive.js`:

```javascript
const PING_INTERVAL = 14 * 60 * 1000; // Cambiar el número 14 por el que desees
```

**Recomendación:** No pongas más de 14 minutos, ya que Render apaga el servidor a los 15 minutos.

### Desactivar el Servicio

Si en algún momento quieres desactivar el servicio, simplemente elimina o comenta estas líneas en `server/index.js`:

```javascript
// if (process.env.NODE_ENV === 'production') {
//     require('./services/keepAlive');
//     console.log('🔄 Servicio Keep-Alive activado para Render');
// }
```

## 🎯 Alternativas

Si prefieres no usar esta solución, tienes estas alternativas:

### 1. **Cron-Job Externo** (Recomendado si quieres algo externo)

Usa un servicio gratuito como [Cron-Job.org](https://cron-job.org/) o [UptimeRobot](https://uptimerobot.com/):

- Configura un job que haga una petición GET a tu backend cada 14 minutos
- URL: `https://aurea-backend-col2.onrender.com/`
- Intervalo: 14 minutos

### 2. **Actualizar al Plan Paid de Render**

El plan pago de Render ($7/mes) mantiene el servidor siempre activo sin necesidad de pings.

## 📝 Notas Finales

- Esta solución es **100% gratuita** y compatible con el plan gratuito de Render
- El servicio consume muy pocos recursos (solo una petición GET cada 14 minutos)
- La petición que hace es muy liviana (solo solicita 1 producto)
- **No necesitas pagar nada** para mantener tu servidor activo 24/7

¡Tu servidor ahora permanecerá activo siempre! 🎉
