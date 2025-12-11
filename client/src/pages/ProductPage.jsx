import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Obtener productos destacados
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        // Tomar solo 4 productos aleatorios
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600 text-sm uppercase tracking-widest">
            Cargando...
          </p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            Producto no encontrado
          </h2>
          <Link
            to="/catalog"
            className="text-sm uppercase tracking-widest hover:underline"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );

  // Simular múltiples imágenes (en producción vendrían del backend)
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="bg-white">
      {/* Breadcrumb / Navegación */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-8">
        <Link
          to="/catalog"
          className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-widest inline-flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al catálogo
        </Link>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Columna Izquierda: Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal */}
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Información del Producto */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Categoría */}
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-500">
                {product.category}
              </span>
            </div>

            {/* Nombre del Producto */}
            <h1 className="font-thin text-4xl md:text-5xl text-gray-800 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reseñas)</span>
            </div>

            {/* Precio y Stock */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-light text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600 uppercase tracking-wider">
                    En Stock
                  </span>
                ) : (
                  <span className="text-sm text-red-600 uppercase tracking-wider">
                    Agotado
                  </span>
                )}
              </div>
              {/* Información de cuotas */}
              <p className="text-sm text-gray-600">
                o 3 cuotas sin interés de $
                {(product.price / 3).toLocaleString()}
              </p>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Selector de Variantes (Colores) */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                Color
              </label>
              <div className="flex gap-3">
                {["Plateado", "Dorado", "Oro Rosa"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedVariant(color)}
                    className={`px-4 py-2 text-sm border transition-all ${
                      selectedVariant === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Cantidad */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} disponibles
                </span>
              </div>
            </div>

            {/* Botón Añadir al Carrito */}
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
              }}
              disabled={product.stock === 0}
              className={`w-full py-4 px-8 text-sm uppercase tracking-widest font-semibold transition-all ${
                product.stock > 0
                  ? "bg-black text-white hover:bg-gray-800 active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Añadir al Carrito" : "Agotado"}
            </button>

            {/* Información Adicional */}
            <div className="pt-8 border-t border-gray-200 space-y-4">
              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Envío Gratis
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recibí tu pedido en 24-48hs sin costo adicional
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Garantía de por Vida
                  </h3>
                  <p className="text-sm text-gray-600">
                    Todas nuestras joyas incluyen garantía contra defectos de
                    fabricación
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">
                    Pago Seguro
                  </h3>
                  <p className="text-sm text-gray-600">
                    Protegemos tus datos con encriptación de nivel bancario
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del Producto */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="font-light text-3xl md:text-4xl text-gray-800 mb-8 uppercase tracking-wide">
            Detalles del Producto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                Materiales
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Elaborado con materiales premium de la más alta calidad. Cada
                pieza es cuidadosamente seleccionada para garantizar durabilidad
                y belleza.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wider">
                Cuidados
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Para mantener el brillo de tu joya, evitá el contacto con
                perfumes y productos químicos. Guardá en un lugar seco cuando no
                la uses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos Destacados */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="font-light text-3xl md:text-4xl text-gray-800 mb-12 uppercase tracking-wide text-center">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((featuredProduct) => (
              <ProductCard
                key={featuredProduct._id}
                product={featuredProduct}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
