import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group block relative">
      {/* Contenedor de Imagen (Aspect Ratio Vertical 3:4) */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700 ease-in-out"
        />

        {/* --- BARRA NEGRA INFERIOR --- */}
        <div className="absolute bottom-0 inset-x-0 bg-black px-5 py-4 flex justify-between items-center transition-colors group-hover:bg-gray-900">
          {/* Nombre (Izquierda) */}
          <h3 className="text-white text-[10px] uppercase tracking-[0.2em] font-medium truncate pr-4 font-sans">
            {product.name}
          </h3>

          {/* Precio (Derecha) */}
          <p className="text-yellow-600 text-[10px] uppercase tracking-[0.1em] font-medium flex-shrink-0 font-sans">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
