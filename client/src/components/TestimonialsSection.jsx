import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "María Campos",
      role: "Cliente frecuente",
      initials: "MC",
      text: "Increíble calidad y atención al detalle. Compré un collar para mi esposa y quedó encantada. El proceso de compra fue muy sencillo y el envío rápido.",
    },
    {
      id: 2,
      name: "Laura Rodríguez",
      role: "Diseñadora",
      initials: "LR",
      text: "Las joyas son hermosas y únicas. Me encanta que cada pieza tiene su propia personalidad. Definitivamente volveré a comprar aquí.",
    },
    {
      id: 3,
      name: "Javier Sánchez",
      role: "Empresario",
      initials: "JS",
      text: "Excelente servicio al cliente y productos de primera calidad. Compré unos aretes como regalo y la presentación fue impecable.",
    },
    {
      id: 4,
      name: "Carolina Méndez",
      role: "Arquitecta",
      initials: "CM",
      text: "Cada joya cuenta una historia. La atención personalizada y el cuidado en cada detalle hacen que cada compra sea especial.",
    },
    {
      id: 5,
      name: "Roberto Fernández",
      role: "Fotógrafo",
      initials: "RF",
      text: "Calidad excepcional y diseños únicos. Perfectas para regalar en ocasiones especiales. Muy recomendable.",
    },
    {
      id: 6,
      name: "Ana Martínez",
      role: "Profesora",
      initials: "AM",
      text: "Me encanta la variedad de diseños. Siempre encuentro algo especial para cada ocasión. El servicio al cliente es excepcional.",
    },
  ];

  // Calcular número de páginas según el tamaño de pantalla
  // Móvil: 1 por página = 6 páginas
  // Desktop: 3 por página = 2 páginas
  const totalPagesMobile = testimonials.length; // 6 páginas en móvil
  const totalPagesDesktop = Math.ceil(testimonials.length / 3);

  // Auto-play: cambiar de página automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPagesMobile);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [totalPagesMobile]);

  const nextPage = () => {
    // En móvil: 6 páginas, en desktop: 2 páginas
    setCurrentPage((prev) => (prev + 1) % totalPagesMobile);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPagesMobile) % totalPagesMobile);
  };

  const goToPage = (index) => {
    setCurrentPage(index);
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
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

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
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

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
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

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

        {/* Indicadores (dots) - 6 en móvil, 3 en tablet, 2 en desktop */}
        <div className="flex justify-center gap-2 mt-8">
          {/* Móvil: 6 dots */}
          <div className="flex md:hidden gap-2">
            {[0, 1, 2, 3, 4, 5].map((pageIndex) => (
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
            {[0, 1, 2].map((pageIndex) => (
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
            {[0, 1].map((pageIndex) => (
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
