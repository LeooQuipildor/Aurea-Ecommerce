import React from "react";

const BenefitsBar = () => {
  const benefits = [
    {
      title: "Envío gratis",
      description: "En pedidos superiores a un mínimo",
    },
    {
      title: "Pagos en casa",
      description: "Paga cómodamente sin correr riesgos",
    },
    {
      title: "Calidad asegurada",
      description: "3 meses de garantía en el metal",
    },
  ];

  // Crear un array con múltiples repeticiones para el efecto marquee
  const marqueeItems = [...benefits, ...benefits, ...benefits, ...benefits];

  return (
    <div className="bg-black/60 text-white py-3 backdrop-blur-sm overflow-hidden">
      <div className="relative flex">
        {/* Primera copia del marquee */}
        <div className="flex animate-marquee whitespace-nowrap text-center">
          {marqueeItems.map((benefit, index) => (
            <div
              key={`marquee-1-${index}`}
              className="flex items-center mx-8 md:mx-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <h3 className="font-semibold uppercase text-base md:text-xl text-white drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
                  {benefit.title}
                </h3>
                <span className="hidden md:inline text-white/50">•</span>
                <p className="text-sm md:text-base text-white/80 font-medium drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Segunda copia del marquee para continuidad */}
        <div
          className="flex animate-marquee whitespace-nowrap"
          aria-hidden="true"
        >
          {marqueeItems.map((benefit, index) => (
            <div
              key={`marquee-2-${index}`}
              className="flex items-center mx-8 md:mx-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <h3 className="font-semibold uppercase text-base md:text-xl text-white drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
                  {benefit.title}
                </h3>
                <span className="hidden md:inline text-white/50">•</span>
                <p className="text-sm md:text-base text-white/80 font-medium drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animación CSS para marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default BenefitsBar;
