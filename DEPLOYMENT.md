# 🚀 DEPLOYMENT GUIDE - AURÉA ECOMMERCE

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com) (Frontend)
- Cuenta en [Render](https://render.com) (Backend)
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Base de datos)

---

## 🗄️ PASO 1: Configurar MongoDB Atlas (GRATIS)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (M0 - Free tier)
4. En "Database Access", crea un usuario con contraseña
5. En "Network Access", agrega `0.0.0.0/0` (permitir todas las IPs)
6. Obtén tu connection string:
   - Click en "Connect" → "Connect your application"
   - Copia el string: `mongodb+srv://usuario:password@cluster.mongodb.net/aurea`

---

## 🖥️ PASO 2: Deploy Backend en Render (GRATIS)

1. Ve a [Render.com](https://render.com) y crea una cuenta
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:

   - **Name**: `aurea-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Agrega las variables de entorno (Environment Variables):

   ```
   MONGODB_URI=tu_connection_string_de_mongodb
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=genera_un_secreto_seguro_aqui
   CORS_ORIGIN=https://aurea.vercel.app
   ```

6. Click en "Create Web Service"
7. **Copia la URL** de tu backend (ej: `https://aurea-backend.onrender.com`)

---

## 🌐 PASO 3: Deploy Frontend en Vercel (GRATIS)

1. Ve a [Vercel.com](https://vercel.com) y crea una cuenta
2. Click en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Configuración:

   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Agrega la variable de entorno:

   - **Name**: `VITE_API_URL`
   - **Value**: `https://aurea-backend.onrender.com` (la URL de tu backend)

6. Click en "Deploy"
7. ¡Tu sitio estará en línea en ~2 minutos!

---

## ✅ PASO 4: Verificación

1. **Frontend**: `https://aurea.vercel.app`
2. **Backend**: `https://aurea-backend.onrender.com`
3. Prueba que todo funcione:
   - Navegación entre páginas
   - Búsqueda de productos
   - Agregar al carrito
   - Checkout

---

## 🔧 Actualizar el Sitio

Cada vez que hagas `git push` a la rama `main`:

- Vercel automáticamente desplegará los cambios del frontend
- Render automáticamente desplegará los cambios del backend

---

## 📱 Dominio Personalizado (Opcional)

### En Vercel:

1. Ve a tu proyecto → Settings → Domains
2. Agrega tu dominio personalizado (ej: `aurea.com`)
3. Sigue las instrucciones para configurar DNS

---

## 🆘 Solución de Problemas

### Error: "Cannot connect to database"

- Verifica que la IP `0.0.0.0/0` esté permitida en MongoDB Atlas
- Verifica que el `MONGODB_URI` sea correcto

### Error: "CORS policy"

- Verifica que `CORS_ORIGIN` en el backend tenga la URL correcta de Vercel

### El sitio no carga

- Verifica que `VITE_API_URL` en Vercel apunte al backend correcto

---

## 📊 Monitoreo

- **Vercel**: Dashboard → Analytics
- **Render**: Dashboard → Logs
- **MongoDB**: Atlas → Metrics

---

¡Listo! Tu ecommerce está en línea 🎉
