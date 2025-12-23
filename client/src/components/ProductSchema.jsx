import PropTypes from "prop-types";

/**
 * Componente ProductSchema para agregar Rich Snippets de Product a las páginas de producto
 * Implementa Schema.org tipo Product con Offer y AggregateRating
 */
const ProductSchema = ({ product }) => {
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images || [product.image],
    description: product.description,
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: "AURÉA",
    },
    offers: {
      "@type": "Offer",
      url: `https://aurea-joyeria.vercel.app/producto/${product._id}`,
      priceCurrency: "COP",
      price:
        product.isOnSale && product.salePrice
          ? product.salePrice
          : product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  // Agregar precio regular si hay descuento
  if (product.isOnSale && product.salePrice) {
    schema.offers.price = product.salePrice;
  }

  // Agregar categoría si existe
  if (product.category) {
    schema.category = product.category;
  }

  // Agregar colores si existen
  if (product.colors && product.colors.length > 0) {
    schema.color = product.colors;
  }

  // Agregar rating si existe (puedes integrarlo cuando implementes reviews)
  // Descomenta cuando tengas sistema de reviews:
  /*
  if (product.rating && product.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    };
  }
  */

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

ProductSchema.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.number,
    isOnSale: PropTypes.bool,
    stock: PropTypes.number,
    category: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    // rating: PropTypes.number,
    // reviewCount: PropTypes.number
  }),
};

export default ProductSchema;
