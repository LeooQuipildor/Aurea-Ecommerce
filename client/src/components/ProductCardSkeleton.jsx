import React from "react";
import { motion } from "framer-motion";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white p-3 shadow-sm flex flex-col h-full drop-shadow-[4px_4px_1px_rgba(0,0,0,0.15)]">
      {/* Imagen skeleton */}
      <motion.div
        className="mb-3 bg-gray-200 h-80"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Texto skeleton */}
      <div className="mb-2 flex-grow space-y-2">
        <motion.div
          className="h-5 bg-gray-200 w-3/4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1,
          }}
        />
        <motion.div
          className="h-5 bg-gray-200 w-1/2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
      </div>

      {/* Botón skeleton */}
      <motion.div
        className="w-full bg-gray-200 h-10"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
    </div>
  );
};

export default ProductCardSkeleton;
