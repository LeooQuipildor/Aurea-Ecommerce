const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <p className="text-yellow-600 text-xs tracking-[0.3em] uppercase mb-4">
          Pequeños detalles que transforman
        </p>
        <h2 className="font-serif text-5xl text-gray-800 mb-8">
          Acerca de Auréa
        </h2>
        <div className="w-px h-16 bg-yellow-600 mx-auto mb-8"></div>{" "}
        {/* Línea vertical decorativa */}
        <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
          Auréa nace del deseo de capturar la luz y la elegancia en formas
          simples. Creemos que cada pieza cuenta una historia y que el verdadero
          lujo reside en la sutileza. Trabajamos con materiales de calidad,
          diseños atemporales y un amor por el detalle que nos convierte no solo
          en una marca, sino en una experiencia para quien lo lleva.
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
