import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // <--- 1. Importamos useLocation
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // <--- 2. Obtenemos la ruta actual

  // Detectar si estamos en la Home Page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        // LÓGICA DE ESTILOS:
        isHomePage && !isScrolled
          ? "bg-transparent border-transparent" // <--- AQUÍ ESTÁ EL CAMBIO: Borde transparente
          : "bg-black shadow-md border-white/10" // <--- Scroll u otras páginas: Borde visible
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* 1. IZQUIERDA: MENÚ */}
          <div className="flex-1 flex items-center justify-start">
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-xl uppercase tracking-widest font-normal"
              >
                Inicio
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-xl uppercase tracking-widest font-normal"
              >
                Productos
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-xl uppercase tracking-widest font-normal"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* 2. CENTRO: LOGO */}
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="Logo Aurea"
              className="h-8 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* 3. DERECHA: ICONOS */}
          <div className="flex-1 flex items-center justify-end space-x-3">
            {/* Buscador */}
            <Link
              to="/"
              className="p-1 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </Link>

            {/* Carrito */}
            <Link
              to="/cart"
              className="relative p-1 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            <Link
              to="/"
              className="p-1 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
