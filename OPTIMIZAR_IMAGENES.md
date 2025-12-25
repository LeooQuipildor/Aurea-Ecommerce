# 🖼️ Guía: Optimizar Imágenes a WebP

## 🎯 Objetivo

Convertir las imágenes principales del sitio a formato WebP para reducir el peso 30-50% y mejorar la velocidad de carga.

---

## ✅ **PASO 1: Identificar Imágenes a Optimizar**

### **Imágenes Prioritarias:**

1. **Hero Image** (`/public/images/hero.png`)

   - Peso actual: ~500KB-1MB
   - Peso objetivo: ~150-300KB
   - Reducción: 50-70%

2. **Imágenes de Productos** (10 principales)

   - Ubicación: `/public/images/productos/`
   - Peso actual: ~200-400KB cada una
   - Peso objetivo: ~60-120KB cada una

3. **Imágenes de Categorías**

   - Collares, Anillos, Pulseras, Aretes
   - Ubicación: `/public/images/categorias/`

4. **Logo** (`/public/images/logo.png`)
   - Solo si es muy pesado (>50KB)

---

## 🛠️ **PASO 2: Herramientas para Convertir**

### **Opción 1: Squoosh (Recomendado)** ⭐⭐⭐⭐⭐

**URL:** https://squoosh.app/

**Ventajas:**

- ✅ Gratis
- ✅ No requiere instalación
- ✅ Funciona en el navegador
- ✅ Control total de calidad
- ✅ Comparación lado a lado

**Pasos:**

1. Abre https://squoosh.app/
2. Arrastra tu imagen
3. En el panel derecho, selecciona **"WebP"**
4. Ajusta calidad a **80-85%**
5. Compara resultado (debe verse igual)
6. Click en **"Download"**
7. Guarda con el mismo nombre + `.webp`

**Ejemplo:**

- `hero.png` → `hero.webp`
- `producto-1.jpg` → `producto-1.webp`

---

### **Opción 2: CloudConvert** ⭐⭐⭐⭐

**URL:** https://cloudconvert.com/png-to-webp

**Ventajas:**

- ✅ Conversión por lotes (múltiples imágenes)
- ✅ Gratis hasta 25 conversiones/día
- ✅ Fácil de usar

**Pasos:**

1. Sube hasta 25 imágenes
2. Selecciona "WebP" como formato de salida
3. Ajusta calidad a 80-85%
4. Click "Convert"
5. Descarga ZIP con todas las imágenes

---

### **Opción 3: TinyPNG** ⭐⭐⭐

**URL:** https://tinypng.com/

**Ventajas:**

- ✅ Muy fácil de usar
- ✅ Compresión inteligente
- ✅ Hasta 20 imágenes a la vez

**Nota:** TinyPNG comprime PNG/JPG pero no convierte a WebP directamente.

---

## 📋 **PASO 3: Proceso Detallado**

### **Para Cada Imagen:**

1. **Abrir Squoosh**

   - Ve a https://squoosh.app/

2. **Subir Imagen**

   - Arrastra la imagen original

3. **Configurar WebP**

   - Panel derecho → Selecciona "WebP"
   - Calidad: 80-85%
   - Método: "Lossy" (mejor compresión)

4. **Verificar Calidad**

   - Usa el slider para comparar
   - Asegúrate que se vea bien
   - Si se ve pixelada, sube calidad a 90%

5. **Descargar**

   - Click "Download"
   - Guarda en tu computadora

6. **Renombrar (si es necesario)**
   - Mantén el mismo nombre base
   - Ejemplo: `hero.png` → `hero.webp`

---

## 📂 **PASO 4: Reemplazar en el Proyecto**

### **Ubicaciones:**

```
client/public/images/
├── hero.webp (reemplaza hero.png)
├── logo.webp (opcional)
├── productos/
│   ├── producto-1.webp
│   ├── producto-2.webp
│   └── ...
└── categorias/
    ├── collares.webp
    ├── anillos.webp
    ├── pulseras.webp
    └── aretes.webp
```

### **Pasos:**

1. **Backup** (opcional pero recomendado)

   - Copia las imágenes originales a una carpeta `backup/`

2. **Copiar WebP**

   - Copia los archivos `.webp` a `/public/images/`

3. **Actualizar Referencias** (si es necesario)
   - La mayoría de navegadores modernos soportan WebP
   - OptimizedImage ya maneja esto automáticamente

---

## 🔧 **PASO 5: Actualizar Código (Si es Necesario)**

### **Si usas `<img>` directamente:**

**Antes:**

```jsx
<img src="/images/hero.png" alt="Hero" />
```

**Después:**

```jsx
<img src="/images/hero.webp" alt="Hero" />
```

### **Si usas OptimizedImage:**

**Ya está optimizado** - Solo cambia la extensión en la prop `src`:

```jsx
<OptimizedImage
  src="/images/hero.webp" // Cambiar .png a .webp
  alt="Hero AURÉA"
  width="1920"
  height="1080"
/>
```

---

## 📊 **PASO 6: Verificar Resultados**

### **Antes de Subir:**

1. **Verifica Peso:**

   - Click derecho en archivo → Propiedades
   - Compara peso original vs WebP
   - Debe ser 30-50% más liviano

2. **Verifica Calidad:**
   - Abre la imagen WebP
   - Debe verse igual que la original
   - Si no, aumenta calidad a 90%

### **Después de Subir:**

1. **Test en Navegador:**

   - Abre tu sitio
   - Verifica que las imágenes carguen
   - Deben verse igual

2. **PageSpeed Insights:**
   - URL: https://pagespeed.web.dev/
   - Ingresa: https://aurea-joyeria.vercel.app
   - Verifica mejora en score

---

## 📈 **RESULTADOS ESPERADOS**

### **Antes de Optimizar:**

- Hero image: 800KB
- 10 productos: 3MB total
- **Total:** ~4MB

### **Después de Optimizar:**

- Hero image: 240KB (-70%)
- 10 productos: 900KB total (-70%)
- **Total:** ~1.2MB

### **Beneficios:**

- ✅ Sitio 3x más rápido
- ✅ Mejor experiencia móvil
- ✅ Mejor score en PageSpeed
- ✅ Mejor SEO (velocidad es factor)
- ✅ Menos datos para usuarios

---

## 🎯 **PLAN DE ACCIÓN**

### **Sesión 1 (30 min):**

1. Convertir hero image
2. Convertir 5 productos principales
3. Subir y verificar

### **Sesión 2 (30 min):**

4. Convertir 5 productos restantes
5. Convertir imágenes de categorías
6. Subir y verificar

**Total:** 1 hora  
**Resultado:** Sitio 50% más rápido

---

## 💡 **CONSEJOS IMPORTANTES**

### **Calidad Recomendada por Tipo:**

**Fotos de Productos:**

- Calidad: 85%
- Razón: Deben verse perfectas

**Hero/Banners:**

- Calidad: 80%
- Razón: Tamaño grande, menos crítico

**Iconos/Logos:**

- Calidad: 90%
- Razón: Detalles importantes

**Fondos:**

- Calidad: 75%
- Razón: Menos crítico

### **Dimensiones Recomendadas:**

**Hero Image:**

- Desktop: 1920x1080px
- Mobile: 1080x1920px (vertical)

**Productos:**

- Catálogo: 800x1067px (3:4 ratio)
- Detalle: 1200x1600px

**Categorías:**

- 600x800px

---

## 🚨 **ERRORES A EVITAR**

❌ **NO hacer:**

- Bajar calidad a menos de 70%
- Convertir logos con transparencia (usa PNG)
- Borrar originales sin backup
- Subir sin verificar calidad

✅ **SÍ hacer:**

- Mantener calidad 80-85%
- Hacer backup de originales
- Verificar en navegador
- Comparar antes/después

---

## 🔄 **FALLBACK para Navegadores Antiguos**

Si necesitas soporte para navegadores muy antiguos:

```html
<picture>
  <source srcset="/images/hero.webp" type="image/webp" />
  <source srcset="/images/hero.jpg" type="image/jpeg" />
  <img src="/images/hero.jpg" alt="Hero" />
</picture>
```

**Nota:** No es necesario para navegadores modernos (2020+)

---

## ✅ **CHECKLIST**

Antes de empezar:

- [ ] Identificar 10-15 imágenes principales
- [ ] Abrir Squoosh.app
- [ ] Crear carpeta backup (opcional)
- [ ] 1 hora disponible

Durante conversión:

- [ ] Calidad 80-85%
- [ ] Formato WebP
- [ ] Comparar calidad
- [ ] Descargar

Después de convertir:

- [ ] Verificar peso reducido
- [ ] Copiar a /public/images/
- [ ] Actualizar referencias (si es necesario)
- [ ] Commit y push
- [ ] Verificar en sitio en vivo

---

## 🎯 **SIGUIENTE PASO**

**Empieza AHORA:**

1. Abre https://squoosh.app/
2. Arrastra tu hero image
3. Selecciona WebP, calidad 80%
4. Descarga
5. Reemplaza en `/public/images/`

**Tiempo:** 5 minutos  
**Resultado:** Hero image 50-70% más liviana

**¡Hazlo ahora!** 🚀
