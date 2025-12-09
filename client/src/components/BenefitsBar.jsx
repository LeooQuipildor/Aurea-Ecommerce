const BenefitsBar = () => {
  return (
    // CAMBIO AQUI:
    // 1. 'bg-black/50': Negro con 50% de opacidad (similar a tu 49%).
    // 2. 'backdrop-blur-md': Aplica el desenfoque al fondo (explicado abajo).
    <div className="bg-black/50 text-white py-8 backdrop-blur-sm">
      {" "}
      {/* Color gris/marrón del diseño */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white-">
        <div className="px-4">
          <h3 className="font-semibold text-2xl text-white drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            Envío gratis
          </h3>
          <p className="text-lg text-white/80 font-medium mt-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            En pedidos superiores a un mínimo
          </p>
        </div>
        <div className="px-4">
          <h3 className="font-semibold text-2xl text-white drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            Pagos en casa
          </h3>
          <p className="text-lg text-white/80 font-medium mt-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            Paga cómodamente sin correr riesgos
          </p>
        </div>
        <div className="px-4">
          <h3 className="font-semibold text-2xl text-white drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            Calidad asegurada
          </h3>
          <p className="text-lg text-white/80 font-medium mt-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
            3 meses de garantía en el metal
          </p>
        </div>
      </div>
    </div>
  );
};
export default BenefitsBar;
