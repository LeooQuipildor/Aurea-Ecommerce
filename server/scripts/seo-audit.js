/**
 * Script de Auditoría SEO Automatizada
 * Verifica aspectos clave del SEO del sitio
 */

const fs = require('fs');
const path = require('path');

// Configuración
const SITE_URL = 'https://aurea-joyeria.vercel.app';
const CLIENT_PATH = path.join(__dirname, '../../client');

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Verificar archivo robots.txt
 */
function checkRobotsTxt() {
  console.log(`\n${colors.cyan}📄 Verificando robots.txt...${colors.reset}`);
  
  const robotsPath = path.join(CLIENT_PATH, 'public/robots.txt');
  
  if (fs.existsSync(robotsPath)) {
    const content = fs.readFileSync(robotsPath, 'utf8');
    console.log(`${colors.green}✅ robots.txt existe${colors.reset}`);
    
    // Verificar que contenga el sitemap
    if (content.includes('Sitemap:')) {
      console.log(`${colors.green}✅ Sitemap declarado en robots.txt${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  Falta declarar el sitemap en robots.txt${colors.reset}`);
    }
    
    return true;
  } else {
    console.log(`${colors.red}❌ robots.txt no encontrado${colors.reset}`);
    return false;
  }
}

/**
 * Verificar sitemap.xml
 */
function checkSitemap() {
  console.log(`\n${colors.cyan}🗺️  Verificando sitemap.xml...${colors.reset}`);
  
  const sitemapPath = path.join(CLIENT_PATH, 'public/sitemap.xml');
  
  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    console.log(`${colors.green}✅ sitemap.xml existe${colors.reset}`);
    
    // Contar URLs
    const urlCount = (content.match(/<url>/g) || []).length;
    console.log(`${colors.blue}📊 Total de URLs en sitemap: ${urlCount}${colors.reset}`);
    
    if (urlCount < 5) {
      console.log(`${colors.yellow}⚠️  Pocas URLs en el sitemap. Considera ejecutar generate-sitemap.js${colors.reset}`);
    }
    
    return true;
  } else {
    console.log(`${colors.red}❌ sitemap.xml no encontrado${colors.reset}`);
    return false;
  }
}

/**
 * Verificar index.html
 */
function checkIndexHtml() {
  console.log(`\n${colors.cyan}📝 Verificando index.html...${colors.reset}`);
  
  const indexPath = path.join(CLIENT_PATH, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.log(`${colors.red}❌ index.html no encontrado${colors.reset}`);
    return false;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // Verificar elementos clave
  const checks = [
    { name: 'Título', regex: /<title>(.+?)<\/title>/, required: true },
    { name: 'Meta descripción', regex: /<meta name="description" content="(.+?)"/, required: true },
    { name: 'Meta keywords', regex: /<meta name="keywords" content="(.+?)"/, required: false },
    { name: 'Open Graph title', regex: /<meta property="og:title" content="(.+?)"/, required: true },
    { name: 'Open Graph description', regex: /<meta property="og:description" content="(.+?)"/, required: true },
    { name: 'Open Graph image', regex: /<meta property="og:image" content="(.+?)"/, required: true },
    { name: 'Twitter Card', regex: /<meta property="twitter:card" content="(.+?)"/, required: true },
    { name: 'Canonical URL', regex: /<link rel="canonical" href="(.+?)"/, required: true },
    { name: 'Google Analytics', regex: /gtag\('config', '(.+?)'\)/, required: false },
    { name: 'Google Search Console', regex: /<meta name="google-site-verification" content="(.+?)"/, required: false },
    { name: 'Structured Data', regex: /<script type="application\/ld\+json">/, required: true },
  ];
  
  let passed = 0;
  let failed = 0;
  
  checks.forEach(check => {
    const match = content.match(check.regex);
    if (match) {
      console.log(`${colors.green}✅ ${check.name}${colors.reset}`);
      passed++;
    } else {
      if (check.required) {
        console.log(`${colors.red}❌ ${check.name} (requerido)${colors.reset}`);
        failed++;
      } else {
        console.log(`${colors.yellow}⚠️  ${check.name} (opcional)${colors.reset}`);
      }
    }
  });
  
  console.log(`\n${colors.blue}📊 Resultado: ${passed} ✅ | ${failed} ❌${colors.reset}`);
  
  return failed === 0;
}

/**
 * Verificar componentes SEO
 */
function checkSEOComponents() {
  console.log(`\n${colors.cyan}🧩 Verificando componentes SEO...${colors.reset}`);
  
  const componentsPath = path.join(CLIENT_PATH, 'src/components');
  
  const components = [
    { name: 'SEO.jsx', path: 'SEO.jsx' },
    { name: 'ProductSchema.jsx', path: 'ProductSchema.jsx' },
    { name: 'OptimizedImage.jsx', path: 'OptimizedImage.jsx' },
  ];
  
  let allExist = true;
  
  components.forEach(component => {
    const fullPath = path.join(componentsPath, component.path);
    if (fs.existsSync(fullPath)) {
      console.log(`${colors.green}✅ ${component.name}${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ ${component.name}${colors.reset}`);
      allExist = false;
    }
  });
  
  return allExist;
}

/**
 * Verificar páginas con SEO
 */
function checkPagesWithSEO() {
  console.log(`\n${colors.cyan}📄 Verificando páginas con SEO...${colors.reset}`);
  
  const pagesPath = path.join(CLIENT_PATH, 'src/pages');
  
  const pages = [
    'HomePage.jsx',
    'CatalogPage.jsx',
    'ProductPage.jsx',
    'ContactPage.jsx',
    'AboutPage.jsx',
  ];
  
  let pagesWithSEO = 0;
  
  pages.forEach(page => {
    const fullPath = path.join(pagesPath, page);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Verificar si importa el componente SEO
      if (content.includes('import SEO from')) {
        console.log(`${colors.green}✅ ${page} - SEO implementado${colors.reset}`);
        pagesWithSEO++;
      } else {
        console.log(`${colors.yellow}⚠️  ${page} - SEO no implementado${colors.reset}`);
      }
    }
  });
  
  console.log(`\n${colors.blue}📊 Páginas con SEO: ${pagesWithSEO}/${pages.length}${colors.reset}`);
  
  return pagesWithSEO === pages.length;
}

/**
 * Generar reporte
 */
function generateReport(results) {
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}📊 REPORTE DE AUDITORÍA SEO${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
  
  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(r => r).length;
  const percentage = Math.round((passed / total) * 100);
  
  console.log(`${colors.blue}Resultado General: ${passed}/${total} (${percentage}%)${colors.reset}\n`);
  
  Object.entries(results).forEach(([test, result]) => {
    const icon = result ? '✅' : '❌';
    const color = result ? colors.green : colors.red;
    console.log(`${color}${icon} ${test}${colors.reset}`);
  });
  
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
  
  if (percentage === 100) {
    console.log(`${colors.green}🎉 ¡Excelente! Tu SEO está perfectamente configurado.${colors.reset}`);
  } else if (percentage >= 80) {
    console.log(`${colors.yellow}⚠️  Buen trabajo, pero hay algunos aspectos a mejorar.${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Se necesitan mejoras importantes en el SEO.${colors.reset}`);
  }
  
  console.log(`\n${colors.blue}💡 Próximos pasos:${colors.reset}`);
  console.log(`1. Revisar los elementos marcados con ❌`);
  console.log(`2. Ejecutar: npm run generate-sitemap`);
  console.log(`3. Verificar en Google Search Console`);
  console.log(`4. Ejecutar auditoría con Lighthouse\n`);
}

/**
 * Función principal
 */
function main() {
  console.log(`${colors.cyan}╔═══════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   AUDITORÍA SEO - AURÉA JOYERÍA      ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════╝${colors.reset}`);
  
  const results = {
    'robots.txt': checkRobotsTxt(),
    'sitemap.xml': checkSitemap(),
    'Meta tags en index.html': checkIndexHtml(),
    'Componentes SEO': checkSEOComponents(),
    'Páginas con SEO': checkPagesWithSEO(),
  };
  
  generateReport(results);
}

// Ejecutar
main();
