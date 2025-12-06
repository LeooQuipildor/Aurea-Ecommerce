import React from "react";
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo Izquierda */}
        <div className="mb-4 md:mb-0">
          <img
            src="/images/logo.png"
            alt="Auréa"
            className="h-8 invert opacity-80"
          />{" "}
          {/* Invert si tu logo es negro */}
          {/* Si tu logo ya es blanco, quita 'invert' */}
        </div>

        {/* Icono Centro */}
        <div className="text-2xl mb-4 md:mb-0 text-gray-400 hover:text-white cursor-pointer transition">
          <i className="fa-brands fa-instagram"></i>{" "}
          {/* O usa un SVG de instagram */}
          <span>📷</span> {/* Placeholder si no tienes FontAwesome */}
        </div>

        {/* Copyright Derecha */}
        <div className="text-gray-600 text-xs tracking-widest">
          © 2024 AURÉA. TODOS LOS DERECHOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
