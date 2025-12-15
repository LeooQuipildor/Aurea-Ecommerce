import { useState } from "react";

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

  const nextPage = () => {
    setCurrentPage((prev) => (prev === 1 ? 0 : 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
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
          {/* Grid de 3 testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 drop-shadow-[0px_0px_1px_rgba(0,0,0,0.15)]">
            {testimonials
              .slice(currentPage * 3, currentPage * 3 + 3)
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

          {/* Botones de navegación - fuera del grid */}
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

        {/* Indicadores (dots) - solo 2 páginas */}
        <div className="flex justify-center gap-2 mt-8">
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
    </section>
  );
};

export default TestimonialsSection;
