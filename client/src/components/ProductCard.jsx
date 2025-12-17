import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }) => {
  const { _id, name, price, image } = product;
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -8 }}
      className="bg-white p-2 sm:p-3 shadow-sm transition-shadow duration-100 hover:shadow-xl flex flex-col h-full group drop-shadow-[4px_4px_1px_rgba(0,0,0,0.15)]"
    >
      {/* Contenedor de Imagen - Optimizado para imágenes verticales */}
      <div className="mb-2 sm:mb-3 overflow-hidden bg-gray-100 aspect-[3/4]">
        <Link to={`/product/${_id}`}>
          <motion.img
            src={image}
            alt={name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full h-full object-cover object-center"
          />
        </Link>
      </div>

      {/* Detalles del producto */}
      <div className="mb-2 text-left flex-grow">
        <Link to={`/product/${_id}`} className="block mt-0">
          <div className="flex flex-col gap-0">
            <h3 className="text-black text-sm sm:text-base lg:text-lg uppercase font-normal truncate tracking-wide leading-none font-sans">
              {name}
            </h3>
            <p className="text-yellow-500 text-base sm:text-lg font-semibold leading-none mb-1 sm:mb-2 font-sans">
              ${price.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Link>
      </div>

      {/* Botón */}
      <motion.button
        onClick={() => addToCart(product)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="w-full bg-black text-white text-xs sm:text-sm font-medium py-2 sm:py-3 px-3 sm:px-4 hover:bg-black transition-colors tracking-widest min-h-[44px]"
      >
        AGREGAR AL CARRITO
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
