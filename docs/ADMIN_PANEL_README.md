# 🎯 Panel de Administración - Aurea E-commerce

## 📋 Descripción

Panel de administración completo para gestionar tu tienda online Aurea. Incluye gestión de productos, pedidos, estadísticas y analytics.

## 🚀 Características

### ✅ Autenticación y Seguridad

- Sistema de login con JWT
- Rutas protegidas
- Roles de usuario (admin/user)
- Sesión persistente

### 📦 Gestión de Productos

- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Subir múltiples imágenes
- Marcar productos como destacados
- Gestión de stock
- Filtros y búsqueda

### 📊 Dashboard

- Estadísticas en tiempo real
- Gráficos de ventas por mes
- Pedidos por estado
- Productos con stock bajo
- Pedidos recientes

### 📈 Analytics

- Tendencias de ventas
- Distribución de productos por categoría
- Métricas de inventario
- Estado de pedidos

### 🛒 Gestión de Pedidos

- Ver todos los pedidos
- Filtrar por estado
- Información detallada de clientes

## 🔐 Credenciales de Acceso

**Email:** admin@aurea.com  
**Password:** admin123

## 🌐 Rutas del Panel

- `/admin/login` - Login de administrador
- `/admin/dashboard` - Dashboard principal
- `/admin/products` - Lista de productos
- `/admin/products/new` - Crear nuevo producto
- `/admin/products/edit/:id` - Editar producto
- `/admin/orders` - Gestión de pedidos
- `/admin/analytics` - Analytics y estadísticas

## 🛠️ Instalación y Configuración

### 1. Instalar Dependencias

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### 2. Configurar Variables de Entorno

Asegúrate de que el archivo `server/.env` contenga:

```env
MONGO_URI=tu_mongodb_uri
PORT=5000
JWT_SECRET=aurea_secret_key_2024_super_secure_change_in_production
```

### 3. Crear Usuario Administrador

```bash
cd server
node seedAdmin.js
```

### 4. Iniciar Servidores

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd client
npm run dev
```

## 📱 Uso del Panel

### Crear un Producto

1. Inicia sesión en `/admin/login`
2. Ve a "Productos" en el menú lateral
3. Haz clic en "Nuevo Producto"
4. Completa el formulario:
   - Nombre del producto
   - Descripción
   - Precio
   - Stock
   - Categoría
   - Imágenes (hasta 5)
   - Marcar como destacado (opcional)
5. Haz clic en "Crear Producto"

### Editar un Producto

1. Ve a "Productos"
2. Haz clic en el icono de editar (lápiz) del producto
3. Modifica los campos necesarios
4. Haz clic en "Actualizar Producto"

### Eliminar un Producto

1. Ve a "Productos"
2. Haz clic en el icono de eliminar (papelera) del producto
3. Confirma la eliminación

### Ver Estadísticas

1. Ve a "Dashboard" para ver un resumen general
2. Ve a "Analytics" para análisis más detallados con gráficos

## 🎨 Tecnologías Utilizadas

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- bcryptjs para encriptación
- Multer para upload de imágenes

### Frontend

- React + Vite
- React Router para navegación
- Axios para peticiones HTTP
- Recharts para gráficos
- Lucide React para iconos
- Sonner para notificaciones
- Context API para estado global

## 🔒 Seguridad

- Todas las rutas de administración están protegidas
- Las contraseñas se encriptan con bcrypt
- Los tokens JWT expiran en 30 días
- Validación de roles en backend y frontend
- Middleware de autenticación en todas las rutas protegidas

## 📝 Notas Importantes

1. **Producción:** Cambia el `JWT_SECRET` en producción
2. **Imágenes:** Actualmente las imágenes se guardan en base64. Para producción, considera usar Cloudinary o AWS S3
3. **Seguridad:** La ruta `/api/auth/create-admin` debería estar protegida en producción
4. **HTTPS:** Usa HTTPS en producción para proteger las credenciales

## 🐛 Solución de Problemas

### Error de autenticación

- Verifica que el JWT_SECRET esté configurado
- Limpia el localStorage del navegador
- Verifica que el token no haya expirado

### No se muestran las estadísticas

- Verifica que haya datos en la base de datos
- Revisa la consola del navegador para errores
- Verifica que el backend esté corriendo

### Error al subir imágenes

- Verifica el tamaño de las imágenes
- Asegúrate de no exceder el límite de 5 imágenes

## 📞 Soporte

Para cualquier problema o sugerencia, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Aurea E-commerce**
