import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "AURÉA - Joyería de Lujo en Colombia",
  description = "Compra joyería de lujo en Colombia con AURÉA. Collares elegantes, anillos únicos, pulseras y aretes de diseño exclusivo. Envío gratis a todo Colombia, calidad premium garantizada.",
  keywords = "joyería Colombia, joyas de lujo Colombia, collares Colombia, anillos Colombia, pulseras Colombia, aretes Colombia, joyería online Colombia, comprar joyas Colombia, AURÉA Colombia, envío gratis Colombia",
  image = "/images/hero.png",
  url = "",
  type = "website",
}) => {
  const siteUrl = "https://aurea.vercel.app";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="geo.region" content="CO" />
      <meta name="geo.placename" content="Colombia" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="AURÉA" />
      <meta property="og:locale" content="es_CO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
};

export default SEO;
