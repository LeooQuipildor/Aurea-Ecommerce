import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Número 404 con animación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="font-thin text-[150px] md:text-[200px] leading-none text-black tracking-tight">
              404
            </h1>
          </motion.div>

          {/* Mensaje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 mb-12"
          >
            <h2 className="font-light text-3xl md:text-4xl text-gray-800 uppercase tracking-wide">
              Página no encontrada
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto">
              Lo sentimos, la página que estás buscando no existe o ha sido
              movida.
            </p>
          </motion.div>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Botón principal - Volver al inicio */}
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-[#F4C430] text-black font-bold py-4 px-8 uppercase tracking-widest text-sm drop-shadow-[4px_4px_1px_rgba(0,0,0,0.3)] hover:bg-[#E5B52A] transition-colors"
              >
                Volver al Inicio
              </motion.button>
            </Link>

            {/* Botón secundario - Ver catálogo */}
            <Link to="/catalogo">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-black text-white font-bold py-4 px-8 uppercase tracking-widest text-sm drop-shadow-[4px_4px_1px_rgba(0,0,0,0.3)] hover:bg-black transition-colors"
              >
                Ver Productos
              </motion.button>
            </Link>
          </motion.div>

          {/* Decoración - Línea */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-16 h-px bg-gray-200 max-w-md mx-auto"
          />

          {/* Enlaces adicionales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
          >
            <Link
              to="/"
              className="text-gray-600 hover:text-black transition-colors uppercase tracking-widest"
            >
              Inicio
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/catalogo"
              className="text-gray-600 hover:text-black transition-colors uppercase tracking-widest"
            >
              Catálogo
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/contacto"
              className="text-gray-600 hover:text-black transition-colors uppercase tracking-widest"
            >
              Contacto
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;
