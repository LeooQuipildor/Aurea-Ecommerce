import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
        transition-all 
        duration-300 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
