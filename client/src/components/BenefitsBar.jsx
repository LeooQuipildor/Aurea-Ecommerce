const BenefitsBar = () => {
  return (
    <div className="bg-[#4B4845] text-white py-8">
      {" "}
      {/* Color gris/marrón del diseño */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-500">
        <div className="px-4">
          <h3 className="font-serif text-lg">Envío gratis</h3>
          <p className="text-xs text-gray-300 font-light mt-1">
            En pedidos superiores a un mínimo
          </p>
        </div>
        <div className="px-4">
          <h3 className="font-serif text-lg">Pagos en casa</h3>
          <p className="text-xs text-gray-300 font-light mt-1">
            Paga cómodamente sin correr riesgos
          </p>
        </div>
        <div className="px-4">
          <h3 className="font-serif text-lg">Calidad asegurada</h3>
          <p className="text-xs text-gray-300 font-light mt-1">
            3 meses de garantía en el metal
          </p>
        </div>
      </div>
    </div>
  );
};
export default BenefitsBar;
