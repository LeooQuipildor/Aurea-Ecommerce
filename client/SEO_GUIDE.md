# SEO Implementation Guide - AURÉA

## 📋 Archivos SEO Implementados

### 1. **robots.txt** (`/public/robots.txt`)

- Guía a los motores de búsqueda sobre qué páginas indexar
- Bloquea rutas administrativas y de API
- Permite acceso a recursos estáticos
- Incluye referencia al sitemap

### 2. **sitemap.xml** (`/public/sitemap.xml`)

- Mapa del sitio para indexación rápida
- Incluye todas las páginas principales
- Categorías de productos
- Prioridades y frecuencias de actualización

### 3. **vercel.json** (`/vercel.json`)

- Configuración de headers de seguridad
- Cache control para assets estáticos
- Redirecciones SEO-friendly
- Rewrites para sitemap y robots.txt

### 4. **Componente SEO** (`/src/components/SEO.jsx`)

- Componente reutilizable para meta tags dinámicos
- Usa react-helmet-async
- Soporta Open Graph y Twitter Cards
- Permite structured data personalizado

## 🎯 Características SEO del index.html

✅ **Meta Tags Completos**

- Title y description optimizados
- Keywords relevantes para joyería en Colombia
- Meta tags de idioma y región (es-CO)
- Robots meta tag configurado

✅ **Open Graph (Facebook/WhatsApp)**

- Imágenes optimizadas (1200x630px)
- Títulos y descripciones específicos
- Locale configurado (es_CO)

✅ **Twitter Cards**

- Summary large image
- Metadata completo

✅ **Structured Data (JSON-LD)**

- Organization schema
- WebSite schema con SearchAction
- Store schema con catálogo
- LocalBusiness schema

## 🚀 Cómo Usar el Componente SEO

### Ejemplo básico:

```jsx
import SEO from "../components/SEO";

function ProductPage() {
  return (
    <>
      <SEO
        title="Collar de Plata Elegante"
        description="Hermoso collar de plata con diseño único. Envío gratis en Colombia."
        keywords="collar plata, joyería Colombia, collar elegante"
        url="https://aurea-joyeria.vercel.app/producto/123"
        image="https://aurea-joyeria.vercel.app/images/collar-plata.jpg"
      />
      {/* Tu contenido aquí */}
    </>
  );
}
```

### Con Structured Data:

```jsx
<SEO
  title="Catálogo de Collares"
  description="Explora nuestra colección de collares de lujo"
  structuredData={{
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "COP",
        },
      },
    })),
  }}
/>
```

## 📊 Checklist de SEO

### ✅ Completado

- [x] Meta tags básicos
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Structured Data (JSON-LD)
- [x] robots.txt
- [x] sitemap.xml
- [x] Canonical URLs
- [x] Security headers
- [x] Componente SEO reutilizable
- [x] HelmetProvider configurado

### 🔄 Pendiente/Recomendado

- [ ] Generar sitemap dinámico desde productos
- [ ] Implementar breadcrumbs con structured data
- [ ] Agregar Product schema en páginas de producto
- [ ] Implementar AggregateRating si tienes reviews
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Implementar PWA (manifest.json, service worker)
- [ ] Configurar Google Analytics
- [ ] Configurar Google Search Console
- [ ] Implementar schema de FAQ en página de contacto

## 🔧 Mantenimiento

### Actualizar Sitemap

Cuando agregues nuevas páginas o productos, actualiza `public/sitemap.xml`:

```xml
<url>
  <loc>https://aurea-joyeria.vercel.app/nueva-pagina</loc>
  <lastmod>2025-12-22</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```

### Verificar SEO

1. **Google Search Console**: https://search.google.com/search-console
2. **Lighthouse**: Auditoría en Chrome DevTools
3. **Schema Validator**: https://validator.schema.org/

## 📈 Métricas Importantes

- **Core Web Vitals**: LCP, FID, CLS
- **Mobile-Friendly**: Responsive design
- **Page Speed**: < 3 segundos
- **Indexación**: Verificar en Google Search Console

## 🌐 URLs Importantes

- **Sitio**: https://aurea-joyeria.vercel.app
- **Sitemap**: https://aurea-joyeria.vercel.app/sitemap.xml
- **Robots**: https://aurea-joyeria.vercel.app/robots.txt
