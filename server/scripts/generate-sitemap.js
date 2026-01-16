/**
 * Script para generar sitemap.xml dinámicamente con todos los productos
 * Ejecutar con: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Configuración
const SITE_URL = 'https://aurea-joyeria.vercel.app';
const OUTPUT_PATH = path.join(__dirname, '../client/public/sitemap.xml');

// URLs estáticas
const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/catalogo', priority: '0.9', changefreq: 'daily' },
  { loc: '/contacto', priority: '0.7', changefreq: 'monthly' },
  { loc: '/sobre-nosotros', priority: '0.6', changefreq: 'monthly' },
  { loc: '/guia-de-tallas', priority: '0.5', changefreq: 'monthly' },
  { loc: '/terminos', priority: '0.3', changefreq: 'yearly' },
];

// Categorías
const categories = ['COLLARES', 'ANILLOS', 'PULSERAS', 'ARETES'];

/**
 * Obtener productos desde la API
 */
async function fetchProducts() {
  try {
    // Intentar conectar a la API local primero
    const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${apiUrl}/api/products`);
    
    if (!response.ok) {
      throw new Error('No se pudo obtener los productos de la API');
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    console.warn('⚠️  No se pudo conectar a la API:', error.message);
    console.log('📝 Generando sitemap solo con URLs estáticas...');
    return [];
  }
}

/**
 * Generar XML del sitemap
 */
function generateSitemapXML(products) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
`;

  // URLs estáticas
  staticUrls.forEach(({ loc, priority, changefreq }) => {
    xml += `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  
`;
  });

  // Categorías
  categories.forEach(category => {
    xml += `  <url>
    <loc>${SITE_URL}/catalogo?category=${category}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
`;
  });

  // Productos
  if (products.length > 0) {
    console.log(`✅ Agregando ${products.length} productos al sitemap...`);
    
    products.forEach(product => {
      const productUrl = `${SITE_URL}/product/${product._id}`;
      const imageUrl = product.images?.[0] || product.image;
      
      xml += `  <url>
    <loc>${productUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;
      
      // Agregar imagen si existe
      if (imageUrl) {
        xml += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${escapeXml(product.name)}</image:title>
      <image:caption>${escapeXml(product.description || product.name)}</image:caption>
    </image:image>`;
      }
      
      xml += `
  </url>
  
`;
    });
  } else {
    console.log('ℹ️  No se encontraron productos para agregar al sitemap');
  }

  xml += `</urlset>`;
  
  return xml;
}

/**
 * Escapar caracteres especiales XML
 */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Guardar sitemap
 */
function saveSitemap(xml) {
  try {
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
    console.log('✅ Sitemap generado exitosamente en:', OUTPUT_PATH);
    console.log(`📊 Total de URLs: ${(xml.match(/<url>/g) || []).length}`);
  } catch (error) {
    console.error('❌ Error al guardar el sitemap:', error.message);
    process.exit(1);
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Generando sitemap.xml...\n');
  
  // Obtener productos
  const products = await fetchProducts();
  
  // Generar XML
  const xml = generateSitemapXML(products);
  
  // Guardar archivo
  saveSitemap(xml);
  
  console.log('\n✨ Proceso completado!');
  console.log('💡 Recuerda enviar el sitemap a Google Search Console:');
  console.log(`   ${SITE_URL}/sitemap.xml`);
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
