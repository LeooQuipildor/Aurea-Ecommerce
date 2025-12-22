# Scripts de Utilidad

Esta carpeta contiene scripts de utilidad para gestión y mantenimiento del servidor.

## 📜 Scripts Disponibles

### `createAdmin.js`

Crea o sincroniza el usuario administrador en MongoDB Atlas.

**Uso:**

```bash
node scripts/createAdmin.js
```

**Credenciales por defecto:**

- Email: `admin@aurea.com`
- Password: `Aurea2024!`

---

### `seed.js`

Poblar la base de datos con datos de prueba completos.

**Uso:**

```bash
node scripts/seed.js
```

---

### `seedProducts.js`

Poblar solo la colección de productos con datos de ejemplo.

**Uso:**

```bash
node scripts/seedProducts.js
```

---

### `cleanOrders.js`

Limpiar órdenes inválidas o de prueba de la base de datos.

**Uso:**

```bash
node scripts/cleanOrders.js
```

---

## ⚙️ Configuración

Todos los scripts requieren que el archivo `.env` esté correctamente configurado con:

```env
MONGODB_URI=mongodb+srv://...
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
```

## 🔒 Seguridad

**IMPORTANTE:** Estos scripts son solo para desarrollo y mantenimiento. En producción:

- No ejecutes scripts de seed
- Usa variables de entorno seguras
- Limita el acceso a estos scripts
