import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BenefitsBar from "../components/BenefitsBar";
import AboutSection from "../components/AboutSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard"; // <--- Importamos el componente renovado

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
      <div className="relative h-screen w-full bg-[#D8D4CC]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-20">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-2 tracking-widest drop-shadow-md italic">
            BRILLO QUE INSPIRA
          </h1>
          <p className="text-xs md:text-sm text-white font-sans tracking-[0.3em] uppercase drop-shadow-sm">
            Pequeños detalles que transforman lo cotidiano
          </p>
          <button className="mt-8 px-8 py-3 bg-transparent border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition duration-300">
            Ver Colección
          </button>
        </div>

        <div className="absolute bottom-0 w-full z-20">
          <BenefitsBar />
        </div>
      </div>

      {/* 2. SECCIÓN MÁS VENDIDOS (Ahora usando el Componente) */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-4xl text-gray-800 mb-2">Más vendidos</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-16">
          Descubre los productos más populares
        </p>

        {/* Grid limpio usando ProductCard */}
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

      {/* Resto de secciones */}
      <AboutSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;
