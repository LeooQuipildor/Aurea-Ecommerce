# 📊 Plan de Mejoras SEO para AURÉA - Basado en Best Practices de Seobility 2025

## 🎯 Análisis Actual

Tu sitio ya tiene una **base sólida de SEO**:

- ✅ Meta tags básicos implementados
- ✅ Structured Data (JSON-LD) para Organization, WebSite, Store y LocalBusiness
- ✅ Open Graph y Twitter Cards
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ React Helmet para SEO dinámico

---

## 🚨 Problemas Críticos Detectados

### 1. **URL Inconsistente** - PRIORIDAD ALTA ⚠️

**Problema:** El sitio tiene URLs mezcladas:

- `index.html` usa: `https://aurea.vercel.app/`
- URL real: `https://aurea-joyeria.vercel.app/`

**Impacto:** Google puede indexar contenido duplicado o confundirse sobre la URL canónica.

**Solución:** Reemplazar todas las instancias de `aurea.vercel.app` por `aurea-joyeria.vercel.app`

---

## 📋 Mejoras Recomendadas (Según Seobility 2025)

### 2. **Optimización de Imágenes** - PRIORIDAD ALTA

**Problemas comunes en e-commerce de joyería:**

- Imágenes sin atributos `alt` descriptivos
- Tamaños de imagen no optimizados
- No usar formatos modernos (WebP, AVIF)

**Recomendaciones:**

- ✅ Agregar `alt` descriptivo a TODAS las imágenes
- ✅ Usar lazy loading para imágenes
- ✅ Comprimir imágenes (herramientas: TinyPNG, Squoosh)
- ✅ Implementar srcset para responsive images
- ✅ Nombres de archivo descriptivos (ej: `collar-oro-18k-perlas.jpg`)

---

### 3. **Sitemap Dinámico con Productos** - PRIORIDAD ALTA

**Problema:** El sitemap actual es estático y no incluye productos individuales.

**Solución:** Generar sitemap dinámico que incluya:

- ✅ Todas las páginas de productos
- ✅ Imágenes de productos
- ✅ Fechas de última modificación reales
- ✅ Prioridades correctas

---

### 4. **Schema Markup para Productos** - PRIORIDAD ALTA

**Recomendación:** Agregar Schema.org tipo "Product" en cada página de producto:

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Nombre del Producto",
  "image": "URL de la imagen",
  "description": "Descripción del producto",
  "sku": "SKU123",
  "brand": {
    "@type": "Brand",
    "name": "AURÉA"
  },
  "offers": {
    "@type": "Offer",
    "url": "URL del producto",
    "priceCurrency": "COP",
    "price": "150000",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "24"
  }
}
```

**Beneficio:** Rich Snippets en Google (estrellas, precios, disponibilidad)

---

### 5. **Breadcrumbs con Structured Data** - PRIORIDAD MEDIA

**Problema:** No hay breadcrumbs visibles ni en el markup.

**Ejemplo de implementación:**

```html
Home > Catálogo > Collares > Collar de Oro
```

**Schema para Breadcrumbs:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://aurea-joyeria.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Collares",
      "item": "https://aurea-joyeria.vercel.app/catalogo?category=Collares"
    }
  ]
}
```

---

### 6. **Mejoras de Performance** - PRIORIDAD ALTA

**Herramientas para medir:**

- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**Optimizaciones:**

- ✅ Minimizar JavaScript y CSS
- ✅ Lazy load de componentes
- ✅ Usar CDN para imágenes (Cloudinary ya lo tienes ✅)
- ✅ Implementar caché de navegador
- ✅ Reducir time to interactive (TTI)
- ✅ Optimizar Core Web Vitals (LCP, FID, CLS)

---

### 7. **Content Marketing** - PRIORIDAD MEDIA

**Problema:** No hay blog ni contenido adicional.

**Recomendación:** Crear sección de blog con contenido útil:

- "Cómo cuidar tus joyas de oro"
- "Guía de regalos: Joyas para cada ocasión"
- "Tendencias en joyería 2025"
- "Significado de las piedras preciosas"
- "Cómo elegir el tamaño de anillo perfecto"

**Beneficio:** Tráfico orgánico, autoridad de dominio, keywords long-tail

---

### 8. **Internal Linking Strategy** - PRIORIDAD MEDIA

**Problema:** Enlaces internos probablemente limitados.

**Estrategia:**

- Enlazar productos relacionados
- Enlazar desde blog a productos relevantes
- Categorías linking entre sí
- Footer con enlaces a páginas importantes
- "También te puede interesar" en productos

---

### 9. **Headings Optimization** - PRIORIDAD MEDIA

**Problema Común:** Múltiples H1 o uso incorrecto de jerarquía.

**Reglas:**

- ✅ Solo **un H1** por página (título principal)
- ✅ H2 para secciones principales
- ✅ H3 para subsecciones
- ✅ Incluir keywords naturalmente en headings
- ✅ Orden lógico y secuencial

---

### 10. **Meta Descriptions Únicas** - PRIORIDAD ALTA

**Problema:** Verificar que cada página tenga meta description única.

**Longitud recomendada:** 150-160 caracteres

**Ejemplo para producto:**

> "Collar de Oro 18k con perlas naturales. Diseño elegante y exclusivo. Envío gratis a toda Colombia. ¡Compra ahora en AURÉA!"

---

### 11. **URL Structure** - PRIORIDAD MEDIA

**Actual:** `/producto/[id]` (probablemente IDs numéricos)

**Recomendación:** URLs descriptivas

```
/producto/collar-oro-18k-perlas-naturales
/catalogo/collares
/catalogo/aretes-oro-diamantes
```

---

### 12. **Alternativas de Idioma (Hreflang)** - PRIORIDAD BAJA

Si planeas expandir a otros países:

```html
<link
  rel="alternate"
  hreflang="es-co"
  href="https://aurea-joyeria.vercel.app/"
/>
<link rel="alternate" hreflang="es-ar" href="https://aurea-joyeria.com.ar/" />
```

---

### 13. **Local SEO** - PRIORIDAD MEDIA

Ya tienes Schema de LocalBusiness ✅

**Mejoras adicionales:**

- Crear perfil de Google Business (si tienes tienda física)
- NAP consistency (Name, Address, Phone) en todo el sitio
- Reviews de clientes en Google
- Menciones locales en keywords

---

### 14. **Datos de Contacto Visibles** - PRIORIDAD ALTA

**Recomendación:** Email y teléfono visibles en el footer de TODAS las páginas (mejora confianza y SEO local).

---

### 15. **SSL y Seguridad** - PRIORIDAD ALTA

✅ **Ya tienes HTTPS** (verificado en URL)

Asegurar:

- Certificado SSL válido
- No hay contenido mixto (HTTP en HTTPS)
- Headers de seguridad correctos

---

### 16. **Social Signals** - PRIORIDAD BAJA

Ya tienes meta tags para Open Graph y Twitter ✅

**Adicional:**

- Instagram Shopping (si aplica)
- Pinterest Rich Pins para productos
- Botones de compartir en redes sociales

---

### 17. **Reviews y Testimonios** - PRIORIDAD ALTA

**Agregar:**

- Schema de Review en productos
- Sección de testimonios en home
- Sistema de reviews de clientes
- Mostrar calificaciones con estrellas (Rich Snippets)

---

### 18. **FAQ Schema** - PRIORIDAD MEDIA

Si tienes sección de FAQs, agregar Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto demora el envío?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El envío tarda entre 24-48 horas a toda Colombia."
      }
    }
  ]
}
```

---

### 19. **Mobile-First** - PRIORIDAD CRÍTICA

**Verificar:**

- ✅ Diseño responsive
- ✅ Botones fáciles de tocar (44x44px mínimo)
- ✅ Texto legible sin zoom
- ✅ Sin contenido horizontal scroll
- ✅ Menú hamburguesa funcional

---

### 20. **Keywords Research** - PRIORIDAD ALTA

**Herramientas:**

- Google Keyword Planner
- Ahrefs
- SEMrush
- Answer the Public

**Focus en:**

- Long-tail keywords: "collar oro 18k mujer Colombia"
- Keywords locales: "joyería Bogotá", "comprar anillos Medellín"
- Buyer intent keywords: "comprar", "precio", "mejor"

---

## 🛠️ Acciones Inmediatas (Priority Order)

1. **Corregir URLs inconsistentes** ⚠️
2. **Agregar Schema de Product** en páginas de producto
3. **Optimizar todas las imágenes** (alt tags, compresión, lazy load)
4. **Crear sitemap dinámico** con productos
5. **Verificar meta descriptions únicas** en cada página
6. **Optimizar H1/H2/H3** en todas las páginas
7. **Mejorar performance** (PageSpeed)
8. **Agregar breadcrumbs** con schema
9. **Internal linking strategy**
10. **Content marketing** (blog)

---

## 📈 Métricas a Monitorear

1. **Google Search Console**

   - Impresiones
   - Clics
   - CTR
   - Posición promedio
   - Errores de rastreo

2. **Google Analytics 4**

   - Tráfico orgánico
   - Páginas de entrada
   - Tasa de rebote
   - Conversiones

3. **Core Web Vitals**

   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

4. **Herramientas SEO**
   - Seobility (Score actual vs futuro)
   - Ahrefs/SEMrush (Domain Rating, Backlinks)

---

## 🎯 Goals a 3 Meses

- Domain Rating: 20+
- Organic Traffic: +200%
- Keywords ranking: 50+ en top 100
- PageSpeed Score: 90+
- Backlinks: 20+

---

¿Te ayudo a implementar alguna de estas mejoras en particular?
