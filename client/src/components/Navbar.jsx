import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Detectar si estamos en la Home Page
  const isHomePage = location.pathname === "/";

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar búsqueda al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar búsqueda con tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Enfocar input cuando se abre la búsqueda
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Buscar productos
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 5)); // Mostrar máximo 5 resultados
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isHomePage && !isScrolled
          ? "bg-transparent border-transparent"
          : "bg-black shadow-md border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-14 sm:h-16">
          {/* 1. IZQUIERDA: MENÚ HAMBURGUESA (MÓVIL) / MENÚ (DESKTOP) */}
          <div className="flex-1 flex items-center justify-start">
            {/* Botón hamburguesa - Solo móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded transition-colors"
              aria-label="Menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Menú desktop */}
            <div className="hidden md:flex space-x-4 lg:space-x-6">
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                } transition-colors text-base lg:text-xl uppercase tracking-widest font-normal`}
              >
                Inicio
              </Link>
              <Link
                to="/catalogo"
                className={`${
                  location.pathname === "/catalogo"
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                } transition-colors text-base lg:text-xl uppercase tracking-widest font-normal`}
              >
                Productos
              </Link>
              <Link
                to="/contacto"
                className={`${
                  location.pathname === "/contacto"
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                } transition-colors text-base lg:text-xl uppercase tracking-widest font-normal`}
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* 2. CENTRO: LOGO */}
          <Link
            to="/"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="Logo Aurea"
              className="h-10 sm:h-12 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* 3. DERECHA: ICONOS */}
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-3">
            {/* Buscador */}
            <div ref={searchRef} className="relative">
              {/* Input de búsqueda expandible */}
              <div
                className={`flex items-center transition-all duration-300 ease-in-out ${
                  isSearchOpen ? "w-64" : "w-auto"
                }`}
              >
                {isSearchOpen && (
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/70 px-4 py-1.5 text-base focus:outline-none focus:border-white/40 transition-all"
                  />
                )}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-1 text-white/80 hover:text-white transition-colors ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>

              {/* Resultados de búsqueda */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg max-h-96 overflow-y-auto animate-fade-in">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-sm font-bold text-gray-900">
                          ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mensaje de no resultados */}
              {isSearchOpen &&
                searchQuery.trim() !== "" &&
                searchResults.length === 0 && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg p-4 text-center animate-fade-in">
                    <p className="text-sm text-gray-500">
                      No se encontraron productos
                    </p>
                  </div>
                )}
            </div>

            {/* Carrito */}
            <Link
              to="/cart"
              className="relative p-1 text-white/80 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-black bg-yellow-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            <Link
              to="/admin/login"
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 px-4 text-base uppercase tracking-widest font-normal rounded transition-colors ${
                location.pathname === "/"
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 px-4 text-base uppercase tracking-widest font-normal rounded transition-colors ${
                location.pathname === "/catalogo"
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Productos
            </Link>
            <Link
              to="/contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 px-4 text-base uppercase tracking-widest font-normal rounded transition-colors ${
                location.pathname === "/contacto"
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
