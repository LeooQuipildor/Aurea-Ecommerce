import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "AURÉA - Joyería Minimalista de Lujo",
  description = "Descubrí la colección de joyería minimalista AURÉA. Collares, anillos, pulseras y aretes de diseño único. Envío gratis en todas las compras. Calidad premium y estilo urbano.",
  keywords = "joyería, joyas minimalistas, collares, anillos, pulseras, aretes, joyería Colombia, joyería de lujo, accesorios, bisutería fina, joyería urbana, AURÉA",
  image = "/images/logo.png",
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
