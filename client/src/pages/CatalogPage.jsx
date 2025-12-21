import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [sortBy, setSortBy] = useState("featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleCategorySelect = (category) => {
    // Si la categoría seleccionada es la misma, deseleccionar (volver a TODOS)
    if (selectedCategory === category && category !== "TODOS") {
      setSelectedCategory("TODOS");
    } else {
      setSelectedCategory(category);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-black text-white pt-24 pb-16">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Texto Izquierda */}
            <div className="space-y-6">
              <h1 className="font-thin text-5xl md:text-8xl leading-none">
                Elegancia actual diseñada para vos.
              </h1>
              <p className="text-gray-200 text-sm md:text-xl leading-relaxed">
                Descubrí nuestra colección de joyas. Seleccionamos piezas de
                tendencia global con atención al detalle para acercarte un
                estilo único.
              </p>
            </div>

            {/* Cards de Filtro - 4 categorías */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "COLLARES", image: "/images/collar.jpg" },
                { name: "ANILLOS", image: "/images/anillo.jpg" },
                { name: "PULSERAS", image: "/images/pulsera.jpg" },
                { name: "ARETES", image: "/images/aretes.jpg" },
              ].map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className="group relative aspect-[3/4] bg-gray-800 rounded-sm overflow-hidden cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Overlay con nombre */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="text-white text-sm md:text-base font-semibold uppercase tracking-widest">
                      {category.name}
                    </span>
                  </div>
                  {/* Indicador de selección */}
                  {selectedCategory === category.name && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Título y Filtros */}
        <div className="mb-12">
          <h2 className="font-thin text-6xl md:text-7xl text-gray-800 mb-8 uppercase text-center md:text-left">
            Todos nuestros productos
          </h2>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
            {/* Dropdown de Categorías */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm uppercase tracking-widest text-black font-semibold border-b-2 border-black pb-1 hover:text-gray-700 transition-colors"
              >
                {selectedCategory}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg py-2 z-10 min-w-[150px]">
                  {["TODOS", "COLLARES", "ANILLOS", "PULSERAS", "ARETES"].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left px-4 py-2 text-sm uppercase tracking-widest transition-colors ${
                          selectedCategory === category
                            ? "text-black font-semibold bg-gray-50"
                            : "text-gray-600 hover:text-black hover:bg-gray-50"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
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
                className="text-base border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-black"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
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
      <section className="bg-white">
        <div className="w-full">
          {/* Título y Subtítulo */}
          <div className="text-center mb-16">
            <h2 className="font-light text-4xl md:text-6xl text-gray-800 mb-4 uppercase tracking-wide">
              Por qué miles de personas nos eligen cada día
            </h2>
            <p className="text-gray-700 text-xs md:text-xl max-w-3xl mx-auto leading-relaxed">
              Disfrutá ventajas únicas en cada compra, pensadas para ofrecerte
              calidad, confianza y una experiencia premium
            </p>
          </div>

          {/* Grid: 2 columnas en móvil, 3x2 en desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-0">
            {/* Móvil Fila 1: Foto (izq) - Desktop Fila 1 Col 2: Imagen */}
            <div className="overflow-hidden md:order-2">
              <img
                src="/images/garantia.png"
                alt="Garantía de Calidad"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>

            {/* Móvil Fila 1: Texto (der) - Desktop Fila 1 Col 1: Texto */}
            <div className="flex items-center justify-center p-8 md:p-12 md:order-1">
              <div className="text-center max-w-sm">
                <h3 className="font-light-semibold text-2xl md:text-4xl mb-4 text-gray-800">
                  Garantía de Calidad
                </h3>
                <p className="text-gray-700 text-xs md:text-lg leading-relaxed">
                  Te ofrecemos piezas elaboradas con materiales premium y
                  terminaciones impecables para que disfrutes joyas que duran
                  toda la vida.
                </p>
              </div>
            </div>

            {/* Móvil Fila 2: Texto (izq) - Desktop Fila 1 Col 3: Texto */}
            <div className="flex items-center justify-center p-8 md:p-12 md:order-3">
              <div className="text-center max-w-sm">
                <h3 className="font-light-semibold text-2xl md:text-4xl mb-4 text-gray-800">
                  Envío Gratis
                </h3>
                <p className="text-gray-700 text-xs md:text-lg leading-relaxed">
                  Llegamos a la puerta de tu casa, en cualquier punto del país y
                  sin costos extra.
                </p>
              </div>
            </div>

            {/* Móvil Fila 2: Foto (der) - Desktop Fila 2 Col 1: Imagen */}
            <div className="overflow-hidden md:order-4">
              <img
                src="/images/Envio.png"
                alt="Envío Gratis"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>

            {/* Móvil Fila 3: Foto (izq) - Desktop Fila 2 Col 3: Imagen */}
            <div className="overflow-hidden md:order-6">
              <img
                src="/images/atencion.png"
                alt="Garantía de por Vida"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>

            {/* Móvil Fila 3: Texto (der) - Desktop Fila 2 Col 2: Texto */}
            <div className="flex items-center justify-center p-8 md:p-12 bg-gray-50 md:order-5">
              <div className="text-center max-w-sm">
                <h3 className="font-light-semibold text-2xl md:text-4xl mb-4 text-gray-800">
                  Atención Personalizada
                </h3>
                <p className="text-gray-700 text-xs md:text-lg leading-relaxed">
                  Nuestro equipo está disponible para asesorarte y ayudarte a
                  encontrar la joya perfecta para ti.
                </p>
              </div>
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
