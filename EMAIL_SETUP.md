# 📧 Configuración de Gmail para Envío de Emails

Para que el sistema de emails funcione correctamente, necesitas configurar una **Contraseña de Aplicación** en tu cuenta de Gmail.

## 🔐 Pasos para Obtener la Contraseña de Aplicación de Gmail:

### **1. Habilitar Verificación en 2 Pasos**

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú izquierdo, selecciona **"Seguridad"**
3. En la sección "Cómo inicias sesión en Google", haz clic en **"Verificación en 2 pasos"**
4. Sigue los pasos para habilitar la verificación en 2 pasos (si aún no la tienes activada)

### **2. Generar Contraseña de Aplicación**

1. Una vez habilitada la verificación en 2 pasos, regresa a **"Seguridad"**
2. En "Cómo inicias sesión en Google", busca **"Contraseñas de aplicaciones"**
3. Haz clic en **"Contraseñas de aplicaciones"**
4. Es posible que te pida ingresar tu contraseña de Google nuevamente
5. En "Selecciona la app", elige **"Correo"**
6. En "Selecciona el dispositivo", elige **"Otro (nombre personalizado)"**
7. Escribe un nombre como **"AUREA Backend"**
8. Haz clic en **"Generar"**
9. Google te mostrará una contraseña de 16 caracteres (ejemplo: `abcd efgh ijkl mnop`)
10. **COPIA ESTA CONTRASEÑA** (sin espacios: `abcdefghijklmnop`)

### **3. Configurar Variables de Entorno**

Agrega estas variables a tu archivo `.env` en el servidor:

```bash
EMAIL_USER=aurea.co.store@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

**⚠️ IMPORTANTE:**

- La contraseña de aplicación es de **16 caracteres** sin espacios
- NO uses tu contraseña normal de Gmail
- Guarda esta contraseña de forma segura
- No la compartas ni la subas a GitHub

## ✅ Verificar Configuración

Una vez configurado, el sistema enviará automáticamente:

### **Para Pedidos (Checkout):**

- ✉️ Email de confirmación al cliente
- 📧 Notificación al admin con detalles del pedido

### **Para Contacto:**

- ✉️ Email de confirmación al cliente
- 📧 Notificación al admin con el mensaje

## 🧪 Probar el Envío de Emails

1. Asegúrate de que las variables de entorno estén configuradas
2. Reinicia el servidor: `npm run dev`
3. Realiza un pedido de prueba o envía un mensaje de contacto
4. Verifica tu bandeja de entrada

## 🔧 Troubleshooting

### **Error: "Invalid login"**

- Verifica que la contraseña de aplicación esté correcta (16 caracteres sin espacios)
- Asegúrate de que la verificación en 2 pasos esté habilitada

### **Error: "self signed certificate"**

- Esto puede ocurrir en desarrollo local
- Solución temporal: Agregar `tls: { rejectUnauthorized: false }` en la configuración del transporter

### **No llegan los emails**

- Revisa la carpeta de spam
- Verifica que `EMAIL_USER` sea el email correcto
- Revisa los logs del servidor para ver errores

## 📝 Notas de Producción

Cuando despliegues en **Render** o cualquier otro servicio:

1. Agrega las variables de entorno en el panel de configuración
2. NO incluyas las credenciales en el código
3. Usa el archivo `.env.example` como referencia
4. Considera usar un servicio profesional como SendGrid o Mailgun para producción (opcional)

## 🎨 Personalización de Templates

Los templates de email están en: `server/services/emailService.js`

Puedes personalizar:

- Colores y estilos
- Contenido de los mensajes
- Estructura HTML
- Agregar más información

---

**¿Necesitas ayuda?** Revisa la documentación de Nodemailer: https://nodemailer.com/
