import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente Breadcrumbs con Schema.org para mejorar SEO y UX
 * Muestra la ruta de navegación actual y genera structured data
 */
const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  // Generar Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url || undefined,
    })),
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}

              {index === items.length - 1 ? (
                // Último elemento (no es link)
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                // Links intermedios
                <Link
                  to={item.url}
                  className="hover:text-black transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumbs;
