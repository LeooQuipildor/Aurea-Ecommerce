import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Filtrar productos por categoría
  useEffect(() => {
    let filtered = [...products];

    // Filtrar por categoría
    if (selectedCategory !== "TODOS") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Ordenar
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products]);

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-black text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Texto Izquierda */}
            <div className="space-y-6">
              <h1 className="font-thin text-5xl md:text-7xl leading-tight">
                Elegancia actual
                <br />
                diseñada para vos
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
                Descubrí nuestra colección completa de joyas artesanales. Cada
                pieza está diseñada con atención al detalle para realzar tu
                estilo único.
              </p>
            </div>

            {/* Imágenes Derecha */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-[3/4] bg-gray-800 rounded-sm overflow-hidden">
                <img
                  src="/images/hero.jpeg"
                  alt="Collar"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="aspect-[3/4] bg-gray-800 rounded-sm overflow-hidden">
                <img
                  src="/images/hero.jpeg"
                  alt="Anillo"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="aspect-[3/4] bg-gray-800 rounded-sm overflow-hidden">
                <img
                  src="/images/hero.jpeg"
                  alt="Pulsera"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Título y Filtros */}
        <div className="mb-12">
          <h2 className="font-thin text-6xl md:text-7xl text-gray-800 mb-8 text-center">
            Todos nuestros productos
          </h2>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-6">
            {/* Categorías */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {["TODOS", "COLLARES", "ANILLOS", "PULSERAS", "ARETES"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm uppercase tracking-widest transition-colors ${
                      selectedCategory === category
                        ? "text-black font-semibold border-b-2 border-black pb-1"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            {/* Ordenar */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 uppercase tracking-wider">
                Ordenar por:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-black"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-black transition">
            ‹
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center text-sm ${
                page === 1
                  ? "bg-black text-white"
                  : "border border-gray-300 hover:border-black"
              } transition`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-black transition">
            ›
          </button>
        </div>
      </section>

      {/* SECCIÓN "POR QUÉ MILES DE PERSONAS NOS ELIGEN" */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-thin text-5xl md:text-6xl text-center text-gray-800 mb-4">
            Por qué miles de personas nos eligen cada día
          </h2>
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-12">
            MÁS QUE JOYAS, EXPERIENCIAS QUE BRILLAN • CALIDAD PREMIUM • ENVÍO
            GRATIS • GARANTÍA DE POR VIDA
          </p>

          {/* Grid de Garantías */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Garantía 1 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="/images/hero.jpeg"
                  alt="Garantía de Calidad"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Garantía de Calidad
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Trabajamos con materiales premium y cada pieza pasa por un
                riguroso control de calidad. Si no te gusta, te devolvemos tu
                dinero.
              </p>
            </div>

            {/* Garantía 2 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="/images/hero.jpeg"
                  alt="Envío Gratis"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Envío Gratis y Rápido
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Recibí tu pedido en 24-48hs sin costo adicional. Empaque premium
                y seguimiento en tiempo real de tu compra.
              </p>
            </div>

            {/* Garantía 3 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="/images/hero.jpeg"
                  alt="Garantía de por Vida"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-800">
                Garantía de por Vida
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Todas nuestras joyas incluyen garantía de por vida contra
                defectos de fabricación. Tu inversión está protegida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ y Footer */}
      <FAQSection />
      <Footer />
    </div>
  );
};

export default CatalogPage;
