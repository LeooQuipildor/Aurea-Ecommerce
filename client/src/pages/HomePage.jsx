import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BenefitsBar from "../components/BenefitsBar";
import AboutSection from "../components/AboutSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <div className="relative h-screen w-full bg-[#000]">
        {/* A. IMAGEN DE FONDO */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/images/hero.jpeg')" }}
        ></div>

        {/* B. CAPA DE RUIDO (ESPECIFICACIONES EXACTAS) */}
        <div
          // 1. Opacidad al 25% (opacity-25)
          // 2. mix-blend-overlay ayuda a que el ruido se integre en la foto
          // 3. pointer-events-none para que no moleste al mouse
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            // El SVG ahora incluye <feColorMatrix type='saturate' values='0'/> para que sea blanco y negro (ruido negro)
            // Y baseFrequency='0.50' para el tamaño solicitado.
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.60' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* C. TEXTO (Contenido) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-20">
          <h1 className="font-alumni font-thin text-5xl md:text-8xl text-white mb-2 tracking-widest italic drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            BRILLO QUE INSPIRA
          </h1>

          <p className="text-xs md:text-base text-white font-semibold tracking-[0.3em] uppercase drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            Pequeños detalles que transforman lo cotidiano
          </p>

          <button className="mt-8 px-8 py-3 bg-transparent border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition duration-300  drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            Ver Colección
          </button>
        </div>

        <div className="absolute bottom-0 w-full z-20">
          <BenefitsBar />
        </div>
      </div>

      {/* 2. SECCIÓN MÁS VENDIDOS */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="font-thin text-7xl text-gray-800 mb-2">Más vendidos</h2>
        <p className="text-gray-400 text-base uppercase tracking-widest mb-16 ">
          Descubrí los productos más populares que nuestros clientes aman
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <Link
          to="/catalogo"
          className="inline-block mt-16 border-b-2 border-black pb-1 text-xs uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition"
        >
          Ver Todos los Productos
        </Link>
      </section>

      <AboutSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;
