import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-5 ">
      <div className="max-w-7xl mx-auto p-2 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo e Instagram juntos a la izquierda */}
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          {/* Logo */}
          <img
            src="/images/logo.webp"
            alt="Auréa"
            className="h-14 brightness-0 invert"
          />

          {/* Icono Instagram */}
          <a
            href="https://www.instagram.com/aurea.only"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition opacity-90 hover:opacity-100"
            aria-label="Instagram"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="#ffffff"
                ></path>
                <path
                  d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                  fill="#ffffff"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </a>
        </div>

        {/* Información de Contacto - Centro */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-gray-300">
          <a
            href="tel:+573218422436"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
          >
            <span>📞</span>
            <span>+57 321 842 2436</span>
          </a>
          <span className="hidden md:inline text-gray-600">|</span>
          <a
            href="mailto:aurea.co.store@gmail.com"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
          >
            <span>📧</span>
            <span>aurea.co.store@gmail.com</span>
          </a>
          <span className="hidden md:inline text-gray-600">|</span>
          <span className="flex items-center gap-2">
            <span>📍</span>
            <span>Colombia</span>
          </span>
        </div>

        {/* Links Derecha */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-xs text-gray-300">
          <Link
            to="/sobre-nosotros"
            className="hover:text-yellow-400 transition-colors tracking-wide"
          >
            Sobre Nosotros
          </Link>
          <span className="hidden md:inline text-gray-600">|</span>
          <Link
            to="/guia-de-tallas"
            className="hover:text-yellow-400 transition-colors tracking-wide"
          >
            Guía de Tallas
          </Link>
          <span className="hidden md:inline text-gray-600">|</span>
          <Link
            to="/terminos"
            className="hover:text-yellow-400 transition-colors tracking-wide"
          >
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
