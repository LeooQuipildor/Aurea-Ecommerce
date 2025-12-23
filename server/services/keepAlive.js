// Servicio para mantener el servidor activo en Render (plan gratuito)
// Este script hace ping al servidor cada 14 minutos para evitar que se apague

const BACKEND_URL = 'https://aurea-backend-co12.onrender.com'; // Cambia esto por tu URL de Render
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutos en milisegundos

async function pingServer() {
  try {
    const response = await fetch(`${BACKEND_URL}/`);
    const timestamp = new Date().toLocaleString('es-AR', { 
      timeZone: 'America/Argentina/Buenos_Aires' 
    });
    
    if (response.ok) {
      console.log(`✅ [${timestamp}] Ping exitoso - Servidor activo`);
    } else {
      console.log(`⚠️ [${timestamp}] Ping respondió con status: ${response.status}`);
    }
  } catch (error) {
    const timestamp = new Date().toLocaleString('es-AR', { 
      timeZone: 'America/Argentina/Buenos_Aires' 
    });
    console.error(`❌ [${timestamp}] Error al hacer ping:`, error.message);
  }
}

// Primera ejecución inmediata
console.log('🚀 Servicio de Keep-Alive iniciado');
console.log(`📍 URL: ${BACKEND_URL}`);
console.log(`⏱️ Intervalo: ${PING_INTERVAL / 60000} minutos\n`);
pingServer();

// Programar pings periódicos
setInterval(pingServer, PING_INTERVAL);
