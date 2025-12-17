import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        bg-[#F4C430] 
        text-black 
        font-bold 
        py-4 
        px-8 
        uppercase 
        tracking-widest 
        text-sm 
        drop-shadow-[4px_4px_1px_rgba(0,0,0,0.3)]
        border-black 
        hover:bg-[#E5B52A] 
        transition-colors 
        duration-300 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;
