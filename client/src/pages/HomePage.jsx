import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BenefitsBar from "../components/BenefitsBar";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { getApiUrl } from "../config/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(getApiUrl("/api/products"));
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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
          style={{ backgroundImage: "url('/images/hero.webp')" }}
        ></div>

        {/* B. CAPA DE RUIDO (ESPECIFICACIONES EXACTAS) */}
        {/* <div
          className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div> */}

        {/* C. TEXTO (Contenido) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-3 sm:px-4 pb-16 sm:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-alumni font-thin text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white mb-2 tracking-widest italic drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]"
          >
            AURÉA - JOYERÍA DE LUJO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xs md:text-base text-white font-semibold tracking-[0.3em] uppercase drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]"
          >
            Collares, Anillos, Pulseras y Aretes | Envío Gratis Colombia
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/catalogo"
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-transparent border border-white text-white font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-black transition duration-300 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)] inline-block"
            >
              Ver Colección
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 w-full z-20">
          <BenefitsBar />
        </div>
      </div>

      {/* 2. SECCIÓN MÁS VENDIDOS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-thin text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-800 mb-2"
        >
          Joyería Más Vendida en Colombia
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm sm:text-base uppercase tracking-widest mb-12 sm:mb-16"
        >
          Descubrí los productos más populares que nuestros clientes aman
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? // Mostrar skeletons mientras carga
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : // Mostrar solo productos destacados (isFeatured: true)
              products
                .filter((product) => product.isFeatured === true)
                .slice(0, 4)
                .map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={index}
                  />
                ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/catalogo"
            className="inline-block mt-16 border-b-2 border-black pb-1 text-base uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition"
          >
            Ver Todos los Productos
          </Link>
        </motion.div>
      </section>

      {/* NUEVA SECCIÓN: Sobre AURÉA (SEO Content) */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-thin text-gray-900 mb-8 text-center"
          >
            Joyería de Lujo Hecha en Colombia
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
          >
            <p>
              En <strong>AURÉA</strong> creamos joyas únicas que cuentan
              historias. Cada pieza es cuidadosamente diseñada y elaborada con
              los mejores materiales para ofrecerte elegancia y calidad que
              perdura en el tiempo. Nuestra pasión por la joyería fina nos
              impulsa a crear accesorios que no solo embellecen, sino que
              también expresan la personalidad única de cada persona.
            </p>

            <p>
              Nuestra colección incluye <strong>collares elegantes</strong>,{" "}
              <strong>anillos únicos</strong>,
              <strong>pulseras sofisticadas</strong> y{" "}
              <strong>aretes exclusivos</strong>. Todas nuestras joyas están
              elaboradas con oro de 18k, plata 925 y piedras preciosas
              auténticas. Cada diseño combina tradición artesanal con técnicas
              modernas de manufactura, garantizando piezas de la más alta
              calidad que resistirán el paso del tiempo.
            </p>

            <p>
              Como marca colombiana de joyería de lujo, nos enorgullece ofrecer{" "}
              <strong>envío gratis a todo Colombia</strong> y una{" "}
              <strong>garantía de por vida</strong> en todas nuestras piezas.
              Creemos que cada joya debe ser una inversión que trascienda
              generaciones, por eso respaldamos nuestro trabajo con la mejor
              garantía del mercado contra defectos de fabricación.
            </p>

            <p>
              Ya sea que busques el regalo perfecto para una ocasión especial,
              un anillo de compromiso que simbolice tu amor eterno, o
              simplemente quieras darte un gusto con una pieza que refleje tu
              estilo personal, en AURÉA encontrarás la joya perfecta. Nuestro
              equipo de expertos está siempre disponible para ayudarte a elegir
              la pieza ideal que se adapte a tus necesidades y presupuesto.
            </p>

            <div className="text-center mt-8">
              <Link
                to="/catalogo"
                className="inline-block border-b-2 border-black pb-1 text-base uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition font-semibold"
              >
                Explorar Colección Completa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AboutSection />

      <TestimonialsSection />

      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;
