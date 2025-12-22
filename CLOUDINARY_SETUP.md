# Configuración de Cloudinary para Aurea E-commerce

Este proyecto ahora usa **Cloudinary** para el almacenamiento y optimización de imágenes de productos.

## 🎯 Beneficios de Cloudinary

- ✅ **Optimización automática**: Compresión y conversión a WebP
- ✅ **CDN global**: Carga rápida desde servidores cercanos al usuario
- ✅ **Transformaciones on-the-fly**: Redimensionamiento automático
- ✅ **Almacenamiento externo**: No ocupa espacio en tu repositorio
- ✅ **Escalabilidad**: Maneja miles de imágenes sin problemas

## 📝 Pasos para Configurar

### 1. Crear Cuenta en Cloudinary

1. Ve a [https://cloudinary.com/](https://cloudinary.com/)
2. Crea una cuenta gratuita (no necesitas tarjeta de crédito)
3. El plan gratuito incluye:
   - 25 GB de almacenamiento
   - 25 GB de ancho de banda mensual
   - Transformaciones ilimitadas

### 2. Obtener Credenciales

Una vez en tu dashboard de Cloudinary:

1. Ve a **Dashboard** (inicio)
2. Encontrarás estos datos en la sección "Product Environment Credentials":
   - **Cloud Name** (nombre de tu nube)
   - **API Key** (clave de API)
   - **API Secret** (secreto de API)

### 3. Configurar Variables de Entorno en el Backend

1. Abre el archivo `.env` en la carpeta `server/`
2. Agrega estas líneas con tus credenciales:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

**Ejemplo:**

```env
CLOUDINARY_CLOUD_NAME=aurea-jewelry
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
```

### 4. Configurar en Render (Producción)

Si ya tienes tu backend desplegado en Render:

1. Ve a tu dashboard de Render
2. Selecciona tu servicio de backend
3. Ve a **Environment**
4. Agrega las siguientes variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Guarda los cambios (Render redesplegará automáticamente)

## 🧪 Probar la Integración

### Desarrollo Local

1. Asegúrate de tener las variables en `server/.env`
2. Reinicia el servidor backend:
   ```bash
   cd server
   npm run dev
   ```
3. Ve al admin panel: `http://localhost:5173/admin/products/new`
4. Intenta subir una imagen
5. Si funciona correctamente, verás:
   - "Subiendo a Cloudinary..." mientras procesa
   - La imagen aparecerá con una URL de Cloudinary (empieza con `https://res.cloudinary.com/`)

### Producción

1. Ve a tu panel de admin en producción
2. Crea o edita un producto
3. Sube una imagen
4. Verifica que la imagen se muestre correctamente

## 🔍 Verificar que las Imágenes se Subieron

1. Ve a tu dashboard de Cloudinary
2. Haz clic en **Media Library** en el menú lateral
3. Deberías ver una carpeta llamada **aurea-jewelry**
4. Ahí estarán todas las imágenes subidas

## 📂 Estructura de Almacenamiento

Las imágenes se guardan en Cloudinary con esta estructura:

```
aurea-jewelry/
  ├── imagen1.jpg
  ├── imagen2.jpg
  └── ...
```

## ⚙️ Configuración Actual

El código está configurado para:

- **Formato**: Acepta JPG, JPEG, PNG, WebP
- **Límite de tamaño**: 1200x1600 px (se redimensiona automáticamente si es mayor)
- **Optimización**: Calidad automática (Cloudinary elige la mejor compresión)
- **Máximo de imágenes por producto**: 5

## 🆘 Solución de Problemas

### Error: "No autorizado" al subir imagen

- **Causa**: Token de autenticación inválido o expirado
- **Solución**: Vuelve a hacer login en el admin panel

### Error: "Error al subir imágenes"

- **Causa**: Credenciales de Cloudinary incorrectas
- **Solución**: Verifica que las variables de entorno estén bien configuradas

### Las imágenes no se muestran

- **Causa**: URLs de Cloudinary bloqueadas por CORS
- **Solución**: En Cloudinary Dashboard > Settings > Security, asegúrate de que "Allowed fetch domains" incluya tu dominio

### Error: "Invalid API Key"

- **Causa**: API Key o API Secret incorrectos
- **Solución**: Copia nuevamente las credenciales desde tu dashboard de Cloudinary

## 📊 Monitoreo de Uso

Para ver cuánto espacio y ancho de banda estás usando:

1. Ve a Dashboard en Cloudinary
2. Verás un gráfico con tu uso actual
3. El plan gratuito te muestra:
   - Almacenamiento usado
   - Ancho de banda usado
   - Créditos restantes

## 🚀 Próximos Pasos (Opcional)

Una vez que tengas Cloudinary funcionando, puedes:

1. **Configurar transformaciones personalizadas**: Para generar thumbnails automáticos
2. **Agregar marcas de agua**: Para proteger tus imágenes
3. **Implementar lazy loading**: Para mejorar la velocidad de carga
4. **Usar formatos modernos**: WebP y AVIF para mejor compresión

---

## ✅ Checklist de Implementación

- [ ] Crear cuenta en Cloudinary
- [ ] Obtener credenciales (Cloud Name, API Key, API Secret)
- [ ] Configurar variables en `server/.env`
- [ ] Configurar variables en Render (producción)
- [ ] Probar subida de imagen en desarrollo
- [ ] Probar subida de imagen en producción
- [ ] Verificar imágenes en Media Library de Cloudinary

**¡Listo!** Tu sistema de gestión de imágenes está configurado y optimizado. 🎉
