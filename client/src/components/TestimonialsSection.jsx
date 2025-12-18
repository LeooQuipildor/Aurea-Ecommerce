import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Valentina",
      role: "Medellín",
      initials: "VG",
      rating: 5,
      text: "El collar es una cosa de locos, demasiado divino. Se nota que le ponen amor a cada detalle. Apenas me llegó lo probé y quedé matada. Súper recomendadísimo, definitivamente les volveré a pedir.",
    },
    {
      id: 2,
      name: "Marcela Martín",
      role: "Bogotá",
      initials: "MM",
      rating: 5,
      text: "Excelente servicio. La verdad estaba un poco indecisa de pedir por internet, pero la asesoría por WhatsApp fue un 10/10, me tuvieron mucha paciencia. El pedido me llegó a Bogotá súper rápido y en perfecto estado. ¡Gracias por todo!",
    },
    {
      id: 3,
      name: "Carolina Muñoz",
      role: "Cali",
      initials: "CM",
      rating: 5,
      text: "Ya es la tercera vez que les compro y nunca fallan. La calidad sigue siendo topp. Me encanta que siempre están pendientes de si ya recibiste el paquete. Son los mejores, no los cambio por nada.",
    },
    {
      id: 4,
      name: "Luisa Fernanda",
      role: "Bucaramanga",
      initials: "LF",
      rating: 4,
      text: "Me pareció súper chévere el producto. La calidad se siente muy buena para el precio que tiene. Lo único fue que la transportadora se demoró un día más de lo esperado, pero la atención de la tienda fue excelente para ayudarme a solucionar.",
    },
    {
      id: 5,
      name: "Andrea Pereira",
      role: "Barranquilla",
      initials: "AP",
      rating: 5,
      text: "Simplemente espectacular. Es tal cual como se ve en las fotos, incluso mejor en persona. ¡Me encantó!",
    },
    {
      id: 6,
      name: "Natalia Ortiz",
      role: "Pereira",
      initials: "NO",
      rating: 5,
      text: "Se lo regalé a mi mamá de cumpleaños y quedó feliz. Estaba buscando algo diferente y de buena calidad, y dimos en el clavo. ¡Gracias por ayudarme a elegir el ideal! Se ganaron una clienta más.",
    },
  ];

  // Calcular número de páginas según el tamaño de pantalla
  const totalPagesMobile = testimonials.length; // 6 páginas en móvil (1 por página)
  const totalPagesTablet = Math.ceil(testimonials.length / 2); // 3 páginas en tablet (2 por página)
  const totalPagesDesktop = Math.ceil(testimonials.length / 3); // 2 páginas en desktop (3 por página)

  // Detectar tamaño de pantalla
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determinar total de páginas según el ancho de pantalla
  const getTotalPages = () => {
    if (windowWidth < 768) return totalPagesMobile; // Móvil
    if (windowWidth < 1024) return totalPagesTablet; // Tablet
    return totalPagesDesktop; // Desktop
  };

  const totalPages = getTotalPages();

  // Resetear currentPage si está fuera del rango cuando cambia el tamaño de pantalla
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages]);

  // Auto-play: cambiar de página automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (index) => {
    setCurrentPage(index);
  };

  // Componente de estrellas
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="font-thin text-6xl md:text-7xl text-gray-800 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-400 text-base uppercase tracking-widest">
            Experiencias reales de quienes confían en Auréa
          </p>
        </div>

        {/* Contenedor del carrusel con padding para los botones */}
        <div className="relative px-12 md:px-16">
          {/* Grid responsive: 1 en móvil, 2 en tablet, 3 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 drop-shadow-[0px_0px_1px_rgba(0,0,0,0.15)]">
            {/* Móvil: mostrar 1 testimonio por página */}
            <div className="md:hidden">
              {testimonials
                .slice(currentPage, currentPage + 1)
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gray-50 p-8 border border-gray-200 hover:border-gray-300 transition-colors flex flex-col"
                  >
                    {/* Estrellas */}
                    <StarRating rating={testimonial.rating} />

                    {/* Texto del testimonio */}
                    <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Información del cliente */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Tablet: mostrar 2 testimonios por página */}
            <div className="hidden md:grid lg:hidden col-span-2 grid-cols-2 gap-6">
              {testimonials
                .slice(
                  currentPage < 3 ? currentPage * 2 : 0,
                  currentPage < 3 ? currentPage * 2 + 2 : 2
                )
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gray-50 p-8 border border-gray-200 hover:border-gray-300 transition-colors flex flex-col"
                  >
                    {/* Estrellas */}
                    <StarRating rating={testimonial.rating} />

                    {/* Texto del testimonio */}
                    <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Información del cliente */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Desktop: mostrar 3 testimonios por página */}
            {testimonials
              .slice(
                currentPage < 2 ? currentPage * 3 : 0,
                currentPage < 2 ? currentPage * 3 + 3 : 3
              )
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="hidden lg:flex bg-gray-50 p-8 border border-gray-200 hover:border-gray-300 transition-colors flex-col"
                >
                  {/* Estrellas */}
                  <StarRating rating={testimonial.rating} />

                  {/* Texto del testimonio */}
                  <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow">
                    "{testimonial.text}"
                  </p>

                  {/* Información del cliente */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Botones de navegación */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            aria-label="Página anterior"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            aria-label="Siguiente página"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Indicadores (dots) - dinámicos según el tamaño de pantalla */}
        <div className="flex justify-center gap-2 mt-8">
          {/* Móvil: 6 dots */}
          <div className="flex md:hidden gap-2">
            {[...Array(totalPagesMobile)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  pageIndex === currentPage
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a la página ${pageIndex + 1}`}
              />
            ))}
          </div>
          {/* Tablet: 3 dots */}
          <div className="hidden md:flex lg:hidden gap-2">
            {[...Array(totalPagesTablet)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  pageIndex === currentPage
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a la página ${pageIndex + 1}`}
              />
            ))}
          </div>
          {/* Desktop: 2 dots */}
          <div className="hidden lg:flex gap-2">
            {[...Array(totalPagesDesktop)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => goToPage(pageIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  pageIndex === currentPage
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a la página ${pageIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
