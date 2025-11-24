import React from "react";
import { Link } from "react-router-dom"; // <--- 1. IMPORTAR

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* 2. USAR LINK: Envolvemos la imagen para que sea clickeable */}
      <Link to={`/product/${product._id}`}>
        <div className="h-64 overflow-hidden relative group cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-5">
        {/* También hacemos clickeable el título */}
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-bold text-gray-800 mb-1 truncate hover:text-blue-600 transition">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex justify-between items-center border-t pt-4 border-gray-100">
          <span className="text-2xl font-extrabold text-blue-600">
            ${product.price}
          </span>
          {/* El botón de Añadir NO debe llevar al detalle, sino al carrito (futuro) */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
