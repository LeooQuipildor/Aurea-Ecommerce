const AboutSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <p className="text-yellow-600 text-lg tracking-[0.3em] uppercase mb-4 font-light">
          PORQUE CADA DETALLE IMPORTA
        </p>
        <h2 className="font-thin text-7xl uppercase text-gray-800 mb-8">
          Acerca de Auréa
        </h2>
        <div className="w-px h-16 bg-yellow-600 mx-auto mb-8"></div>{" "}
        {/* Línea vertical decorativa */}
        <p className="text-gray-500 text-2xl font-light leading-tight max-w-1xl mx-auto">
          En Auréa creemos que la joyería es mucho más que un accesorio: es una
          forma de expresar quién sos. Cada pieza que creamos está pensada para
          acompañar tus momentos, resaltar tu esencia y convertirse en parte de
          tu historia. Trabajamos con materiales de calidad, diseño cuidado y
          una dedicación que se siente en cada detalle. Queremos que brilles
          siempre, a tu manera, y que encuentres en Auréa el lugar donde la
          elegancia se vuelve cotidiana.
        </p>
      </div>

      {/* Grid de 3 imágenes */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 drop-shadow-[4px_4px_1px_rgba(0,0,0,0.15)]">
        {[
          {
            src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
            title: "Envío Gratis Siempre",
          },
          {
            src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800",
            title: "Pagás Cuando Llega",
          },
          {
            src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
            title: "Garantía & Seguridad Total",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group relative h-[250px] md:h-[500px] overflow-hidden bg-black"
          >
            {/* 1. IMAGEN DE FONDO (Con efecto Zoom al Hover) */}
            <img
              src={item.src}
              alt={`Auréa ${item.title}`}
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
            />

            {/* 2. CAPA DE RUIDO (NOISE) */}
            {/* Usamos opacity-30 y mix-blend-overlay para que se fusione con la foto */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.40' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            ></div>

            {/* 3. CAPA OSCURA (Para legibilidad del texto) */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>

            {/* 4. TEXTO CENTRADO */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h3 className="text-white font-medium tracking-[0.2em] uppercase drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)] ">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default AboutSection;
