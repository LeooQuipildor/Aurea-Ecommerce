import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error conectando:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* SECCIÓN HERO (100vh) */}
      <div className="relative h-screen w-full bg-black">
        {" "}
        {/* <--- h-screen es 100vh */}
        {/* Imagen */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpeg')" }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Contenido Texto */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg uppercase font-sans">
            Brillo que inspira
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light tracking-widest max-w-2xl drop-shadow-md italic font-display">
            "Pequeños detalles que transforman lo cotidiano"
          </p>
          <button className="mt-10 px-10 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white border border-white transition duration-300">
            Ver Colección
          </button>
        </div>
        {/* FLECHITA ANIMADA (Nuevo) */}
        <div className="absolute bottom-10 w-full flex justify-center z-10 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white opacity-80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      {/* --- FIN HERO --- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center uppercase tracking-wider">
          Colección Destacada
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
