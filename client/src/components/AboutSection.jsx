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
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800", // Foto oreja/joya
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800", // Foto cuello/collares
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800", // Foto detalle
        ].map((img, index) => (
          <div key={index} className="h-[500px] overflow-hidden">
            <img
              src={img}
              alt="Lifestyle Auréa"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default AboutSection;
