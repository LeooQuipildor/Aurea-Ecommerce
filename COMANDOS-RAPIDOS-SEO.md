# 🚀 Comandos Rápidos SEO - AURÉA

## 📝 Scripts Disponibles

### Auditoría y Sitemap

```bash
# Ejecutar auditoría SEO completa
cd server
npm run seo-audit

# Generar sitemap dinámico con productos
cd server
npm run generate-sitemap
```

### Desarrollo

```bash
# Iniciar servidor backend
cd server
npm run dev

# Iniciar cliente frontend
cd client
npm run dev

# Build para producción
cd client
npm run build
```

---

## 🔍 Verificaciones Rápidas

### 1. Verificar que el sitio esté funcionando

```
https://aurea-joyeria.vercel.app
```

### 2. Verificar robots.txt

```
https://aurea-joyeria.vercel.app/robots.txt
```

### 3. Verificar sitemap.xml

```
https://aurea-joyeria.vercel.app/sitemap.xml
```

### 4. Lighthouse Audit (Chrome)

```
1. Abrir: https://aurea-joyeria.vercel.app
2. F12 → Lighthouse
3. Seleccionar: SEO, Performance, Accessibility
4. Generate Report
```

---

## 🎯 Herramientas Online

### Google Tools

- **Search Console**: https://search.google.com/search-console
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Analytics**: https://analytics.google.com/

### Inspeccionar URL en Google

```
1. Ir a Search Console
2. Barra superior → Pegar URL
3. Enter → Ver cómo Google ve la página
```

---

## 📊 Checklist Diario (Primeros 7 días)

```bash
# Día 1
[ ] Configurar Google Search Console
[ ] Enviar sitemap
[ ] Solicitar indexación de homepage

# Día 2-3
[ ] Solicitar indexación de /catalogo
[ ] Solicitar indexación de /contacto
[ ] Verificar errores en Search Console

# Día 4-7
[ ] Revisar páginas indexadas
[ ] Verificar Rich Snippets de productos
[ ] Ejecutar Lighthouse audit
```

---

## 📈 Checklist Semanal

```bash
[ ] Revisar Google Search Console
  - Impresiones
  - Clics
  - CTR
  - Posición promedio

[ ] Generar sitemap si hay nuevos productos
  cd server && npm run generate-sitemap

[ ] Solicitar indexación de nuevos productos

[ ] Ejecutar auditoría SEO
  cd server && npm run seo-audit

[ ] Verificar errores de rastreo
```

---

## 🔧 Solución Rápida de Problemas

### Problema: Herramienta dice "falta título/H1"

**Solución:** Es normal en React. Verifica con Google Search Console.

### Problema: Página no indexada

**Solución:**

```
1. Search Console → Inspección de URLs
2. Pegar URL
3. "Solicitar indexación"
4. Esperar 1-7 días
```

### Problema: Sitemap no actualizado

**Solución:**

```bash
cd server
npm run generate-sitemap
# Luego reenviar en Search Console
```

### Problema: Error 404 en producto

**Solución:**

```
1. Verificar que el producto existe en BD
2. Verificar routing en React Router
3. Eliminar URL del sitemap si ya no existe
```

---

## 💾 Backup de Configuración

### Meta Tags Importantes (index.html)

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-K3TZ8SW8PV"
></script>

<!-- Google Search Console -->
<meta
  name="google-site-verification"
  content="c2LUJ0--Nq44U8sHPXcNIVMbKUNRJJcdvkpnQilpTAo"
/>

<!-- Canonical -->
<link rel="canonical" href="https://aurea-joyeria.vercel.app/" />
```

### URLs del Sitemap

```
Sitemap: https://aurea-joyeria.vercel.app/sitemap.xml
Robots: https://aurea-joyeria.vercel.app/robots.txt
```

---

## 📞 Contactos Útiles

- **Sitio Web**: https://aurea-joyeria.vercel.app
- **Email**: aurea.co.store@gmail.com
- **WhatsApp**: +57 321 842 2436
- **Instagram**: @aurea.only

---

## 🎓 Documentación

- `SEO-RESUMEN-EJECUTIVO.md` - Resumen completo
- `SEO-GUIDE.md` - Guía detallada de SEO
- `SEO-CHECKLIST.md` - Checklist de tareas
- `GOOGLE-SEARCH-CONSOLE-GUIDE.md` - Configuración GSC

---

**Última actualización:** 2026-01-16
