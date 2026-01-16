# 🔍 Guía: Configurar Google Search Console

## 📌 ¿Qué es Google Search Console?

Google Search Console es la herramienta **MÁS IMPORTANTE** para SEO. Te permite:

- Ver cómo Google ve tu sitio web
- Solicitar indexación de páginas
- Monitorear el rendimiento en búsquedas
- Detectar y corregir errores
- Ver qué palabras clave generan tráfico

---

## 🚀 Paso 1: Acceder a Google Search Console

1. Ve a: https://search.google.com/search-console
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **"Agregar propiedad"**

---

## 🌐 Paso 2: Agregar tu Sitio Web

### Opción A: Dominio (Recomendado)

```
Tipo: Dominio
URL: aurea-joyeria.vercel.app
```

### Opción B: Prefijo de URL

```
Tipo: Prefijo de URL
URL: https://aurea-joyeria.vercel.app
```

**Recomendación:** Usa "Prefijo de URL" porque es más fácil de verificar.

---

## ✅ Paso 3: Verificar la Propiedad

### Método 1: Meta Tag HTML (Ya está implementado ✅)

Tu sitio ya tiene el meta tag de verificación en `index.html`:

```html
<meta
  name="google-site-verification"
  content="c2LUJ0--Nq44U8sHPXcNIVMbKUNRJJcdvkpnQilpTAo"
/>
```

**Pasos:**

1. En Google Search Console, selecciona "Etiqueta HTML"
2. Copia el código que te dan
3. **YA ESTÁ EN TU SITIO** (línea 12 de index.html)
4. Haz clic en "Verificar"

### Método 2: Archivo HTML (Alternativo)

Si el método 1 no funciona:

1. Descarga el archivo HTML que te da Google
2. Súbelo a: `client/public/`
3. Verifica que se pueda acceder: `https://aurea-joyeria.vercel.app/google[código].html`
4. Haz clic en "Verificar"

### Método 3: Google Analytics (Si ya tienes GA configurado)

Tu sitio ya tiene Google Analytics (G-K3TZ8SW8PV):

1. Selecciona "Google Analytics"
2. Verifica que uses la misma cuenta de Google
3. Haz clic en "Verificar"

---

## 📤 Paso 4: Enviar el Sitemap

Una vez verificado:

1. En el menú lateral, ve a **"Sitemaps"**
2. En "Agregar un nuevo sitemap", escribe:
   ```
   sitemap.xml
   ```
3. Haz clic en **"Enviar"**

**URL completa del sitemap:**

```
https://aurea-joyeria.vercel.app/sitemap.xml
```

---

## 🔎 Paso 5: Solicitar Indexación de Páginas Principales

### Páginas Prioritarias para Indexar:

1. **Página Principal**

   ```
   https://aurea-joyeria.vercel.app/
   ```

2. **Catálogo**

   ```
   https://aurea-joyeria.vercel.app/catalogo
   ```

3. **Contacto**

   ```
   https://aurea-joyeria.vercel.app/contacto
   ```

4. **Sobre Nosotros**
   ```
   https://aurea-joyeria.vercel.app/sobre-nosotros
   ```

### Cómo Solicitar Indexación:

1. En el menú superior, busca la barra de búsqueda
2. Pega la URL completa
3. Presiona Enter
4. Espera a que Google inspeccione la URL
5. Si dice "La URL no está en Google", haz clic en **"Solicitar indexación"**
6. Espera unos segundos (puede tardar 1-2 minutos)
7. Repite para cada página principal

---

## 📊 Paso 6: Usar la Herramienta de Inspección de URLs

Esta es la herramienta **MÁS ÚTIL** para verificar tu SEO:

1. En la barra superior, pega cualquier URL de tu sitio
2. Presiona Enter
3. Google te mostrará:
   - ✅ Si la página está indexada
   - 📱 Si es mobile-friendly
   - 🔍 Cómo Google ve el contenido
   - ⚠️ Errores o advertencias

### Ejemplo de Uso:

```
URL a inspeccionar: https://aurea-joyeria.vercel.app/
```

**Resultado esperado:**

- Estado: "La URL está en Google" ✅
- Rastreabilidad: "La URL se puede rastrear" ✅
- Indexación: "La URL se puede indexar" ✅

---

## 📈 Paso 7: Monitorear el Rendimiento

### Ir a "Rendimiento" (Panel Principal)

Aquí verás:

- **Clics totales**: Cuántas personas hicieron clic en tu sitio desde Google
- **Impresiones totales**: Cuántas veces apareció tu sitio en resultados
- **CTR promedio**: Porcentaje de clics (Clics / Impresiones)
- **Posición promedio**: En qué posición apareces en Google

### Métricas Clave:

| Métrica     | Objetivo (3 meses) | Objetivo (6 meses) |
| ----------- | ------------------ | ------------------ |
| Impresiones | 1,000+             | 10,000+            |
| Clics       | 50+                | 500+               |
| CTR         | 3%+                | 5%+                |
| Posición    | <20                | <10                |

---

## 🔧 Paso 8: Revisar Cobertura

1. Ve a **"Cobertura"** en el menú lateral
2. Verás 4 categorías:
   - ✅ **Válidas**: Páginas indexadas correctamente
   - ⚠️ **Válidas con advertencias**: Indexadas pero con problemas menores
   - ❌ **Error**: Páginas con errores que impiden la indexación
   - 🚫 **Excluidas**: Páginas que Google decidió no indexar

### Objetivo:

- Válidas: Todas las páginas públicas
- Error: 0 páginas
- Excluidas: Solo /admin/, /checkout, /order-confirmation

---

## 📱 Paso 9: Verificar Usabilidad Móvil

1. Ve a **"Usabilidad móvil"** en el menú lateral
2. Verifica que no haya errores
3. Objetivo: 0 errores

**Errores comunes:**

- Texto demasiado pequeño
- Elementos táctiles muy juntos
- Contenido más ancho que la pantalla
- Viewport no configurado

**Tu sitio ya está optimizado para móvil** ✅

---

## 🎯 Paso 10: Configurar Mejoras

### Core Web Vitals

1. Ve a **"Core Web Vitals"** en "Experiencia"
2. Verifica que las métricas estén en verde:
   - **LCP** (Largest Contentful Paint): < 2.5s
   - **FID** (First Input Delay): < 100ms
   - **CLS** (Cumulative Layout Shift): < 0.1

### Experiencia de Página

1. Ve a **"Experiencia de página"**
2. Verifica que la mayoría de URLs estén en "Buena"

---

## 📅 Rutina de Mantenimiento

### Diario (Primeros 7 días)

- [ ] Verificar si las páginas fueron indexadas
- [ ] Revisar errores de cobertura

### Semanal

- [ ] Revisar rendimiento (clics, impresiones)
- [ ] Solicitar indexación de nuevos productos
- [ ] Verificar errores de rastreo

### Mensual

- [ ] Analizar palabras clave que generan tráfico
- [ ] Optimizar páginas con bajo CTR
- [ ] Revisar Core Web Vitals
- [ ] Actualizar sitemap si hay cambios

---

## 🚨 Solución de Problemas Comunes

### Problema 1: "La URL no está en Google"

**Solución:**

1. Solicitar indexación manualmente
2. Esperar 1-7 días
3. Si no se indexa, verificar robots.txt

### Problema 2: "La URL se ha rastreado pero no se ha indexado"

**Solución:**

1. Verificar que el contenido sea único
2. Agregar más contenido de calidad
3. Mejorar los meta tags

### Problema 3: "Página bloqueada por robots.txt"

**Solución:**

1. Revisar `/robots.txt`
2. Asegurarte de que no bloquee páginas públicas
3. Tu robots.txt ya está configurado correctamente ✅

### Problema 4: "Error 404"

**Solución:**

1. Verificar que la URL existe
2. Revisar el routing de React Router
3. Eliminar la URL del sitemap si ya no existe

---

## 📊 Interpretando los Datos

### Ejemplo de Análisis:

**Consulta:** "joyería de lujo Colombia"

- Impresiones: 500
- Clics: 15
- CTR: 3%
- Posición: 12

**Interpretación:**

- ✅ Bueno: Apareces en primera página (posición 12)
- ⚠️ Mejorable: CTR bajo (3% es promedio, objetivo 5%+)
- 🎯 Acción: Mejorar el título y descripción para aumentar CTR

---

## 🎓 Recursos Adicionales

- [Guía oficial de Google Search Console](https://support.google.com/webmasters)
- [Centro de ayuda de Search Console](https://support.google.com/webmasters/answer/9128668)
- [Curso gratuito de Google SEO](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

## ✅ Checklist de Configuración

- [ ] Acceder a Google Search Console
- [ ] Agregar propiedad (aurea-joyeria.vercel.app)
- [ ] Verificar propiedad (meta tag HTML)
- [ ] Enviar sitemap.xml
- [ ] Solicitar indexación de páginas principales
- [ ] Inspeccionar URL de homepage
- [ ] Revisar cobertura
- [ ] Verificar usabilidad móvil
- [ ] Configurar alertas por email
- [ ] Revisar rendimiento semanal

---

## 🎉 ¡Listo!

Una vez completados estos pasos, Google Search Console estará completamente configurado.

**Tiempo estimado de indexación:**

- Primeras páginas: 1-3 días
- Sitio completo: 1-2 semanas
- Aparecer en resultados: 2-4 semanas

**Próximo paso:** Ejecutar auditoría con Lighthouse (ver SEO-CHECKLIST.md)
