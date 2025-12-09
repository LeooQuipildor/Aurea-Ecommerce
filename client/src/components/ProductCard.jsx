import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importamos el hook del carrito

const ProductCard = ({ product }) => {
  const { _id, name, price, image } = product;
  const { addToCart } = useCart(); // Usamos la función para agregar

  return (
    <div className="bg-white p-3 shadow-sm transition-shadow duration-100 hover:shadow-xl flex flex-col h-full group drop-shadow-[4px_4px_1px_rgba(0,0,0,0.15)]">
      {/* Contenedor de Imagen */}
      <div className="mb-3 overflow-hidden bg-gray-100">
        <Link to={`/product/${_id}`}>
          <img
            src={image}
            alt={name}
            // CAMBIO CLAVE 1: 'object-cover' hace que la imagen ocupe todo el espacio sin deformarse (recorta los bordes)
            // 'h-80' le da esa altura vertical elegante tipo "Frame 1"
            className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </Link>
      </div>

      {/* Detalles del producto */}
      <div className="mb-2 text-left flex-grow">
        <Link to={`/product/${_id}`} className="block mt-0">
          {" "}
          {/* Aseguramos bloque para el click */}
          <div className="flex flex-col gap-0">
            {" "}
            {/* gap-0 pega los elementos, flex organiza verticalmente */}
            <h3 className="text-black text-lg uppercase font-normal truncate tracking-wide leading-none font-sans">
              {name}
            </h3>
            {/* mt-1 opcional: da un respiro mínimo de 4px si quedan DEMASIADO pegados. 
        Si lo quieres totalmente pegado, quita el 'mt-1' */}
            <p className="text-yellow-500 text-lg font-semibold leading-none mb-2 font-sans">
              ${price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Link>
      </div>

      {/* Botón */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-black text-white text-md font-medium py-0 px-4 hover:bg-gray-900 transition-colors tracking-widest"
      >
        AGREGAR AL CARRITO
      </button>
    </div>
  );
};

export default ProductCard;
