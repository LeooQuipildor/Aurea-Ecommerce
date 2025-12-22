import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * Componente SEO para gestionar meta tags dinámicamente en cada página
 * Usa react-helmet-async para mejor rendimiento
 */
const SEO = ({
  title = "AURÉA - Joyería de Lujo en Colombia",
  description = "Compra joyería de lujo en Colombia con AURÉA. Collares elegantes, anillos únicos, pulseras y aretes de diseño exclusivo. Envío gratis a todo Colombia.",
  keywords = "joyería Colombia, joyas de lujo, collares, anillos, pulseras, aretes",
  image = "https://aurea-joyeria.vercel.app/images/hero.png",
  url = "https://aurea-joyeria.vercel.app",
  type = "website",
  structuredData = null,
}) => {
  const siteTitle = "AURÉA";
  const fullTitle = title.includes(siteTitle)
    ? title
    : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  structuredData: PropTypes.object,
};

export default SEO;
