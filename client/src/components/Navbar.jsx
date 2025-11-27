import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* 1. IZQUIERDA: MENÚ */}
          <div className="flex-1 flex items-center justify-start">
            {/* CAMBIO AQUÍ: Bajé de 'space-x-8' a 'space-x-4' para juntarlos más */}
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-2 py-2 font-medium transition-colors text-sm uppercase tracking-wide"
              >
                Inicio
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-2 py-2 font-medium transition-colors text-sm uppercase tracking-wide"
              >
                Productos
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-2 py-2 font-medium transition-colors text-sm uppercase tracking-wide"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* 2. CENTRO: LOGO (Absoluto) */}
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0 flex items-center cursor-pointer"
          >
            <img
              src="/images/logo.png"
              alt="Logo Aurea"
              className="h-12 w-auto" /* Ajusté un poco la altura para que se vea fino */
            />
          </Link>

          {/* 3. DERECHA: ICONOS */}
          {/* CAMBIO AQUÍ: Bajé de 'space-x-4' a 'space-x-2' o 'space-x-3' */}
          <div className="flex-1 flex items-center justify-end space-x-1">
            {/* Buscador */}
            <Link
              to="/"
              className="relative p-1 text-gray-300 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
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
              className="relative p-1 text-gray-300 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            <Link
              to="/"
              className="relative p-1 text-gray-300 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
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
