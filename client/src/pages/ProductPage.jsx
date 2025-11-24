import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Petición a la nueva ruta que acabamos de crear
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

  if (loading)
    return <div className="text-center py-20">Cargando producto...</div>;
  if (!product)
    return <div className="text-center py-20">Producto no encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Botón Volver */}
      <Link
        to="/"
        className="text-gray-500 hover:text-blue-600 mb-8 inline-block"
      >
        &larr; Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Columna 1: Imagen */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[500px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Columna 2: Información */}
        <div className="flex flex-col justify-center">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center mb-8">
            <span className="text-4xl font-extrabold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.stock > 0 ? (
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                En Stock ({product.stock})
              </span>
            ) : (
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                Agotado
              </span>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Añadir al Carrito
            </button>
            <button className="bg-gray-100 text-gray-800 py-4 px-6 rounded-xl hover:bg-gray-200 transition">
              ❤️
            </button>
          </div>

          {/* Garantías (Visual) */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>🚚</span> Envío Gratis
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span> Garantía de 1 año
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
