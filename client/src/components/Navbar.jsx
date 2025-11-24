// client/src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AUREA
            </span>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Inicio</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Catálogo</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium">Nosotros</a>
          </div>

          {/* Carrito e Iconos */}
          <div className="flex items-center space-x-4">
             {/* Simulación de botón carrito */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">0</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;