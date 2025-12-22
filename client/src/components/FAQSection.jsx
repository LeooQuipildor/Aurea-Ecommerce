import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full py-2 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-200 text-xl font-light uppercase">
          {question}
        </span>
        <span className="text-gray-100 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-100 font-thin text-xl">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-thin text-7xl text-white mb-5">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-2">
          <FAQItem
            question="¿Hacen envíos a todo el país?"
            answer="Sí, realizamos envíos a todo Colombia. Los tiempos de entrega varían según tu ubicación: Bogotá y principales ciudades 1-4 días hábiles, otras ciudades y municipios 5-7 días hábiles."
          />
          <FAQItem
            question="¿Qué métodos de pago aceptan?"
            answer="Aceptamos pago contraentrega. Pagas en efectivo directamente al transportista cuando recibas tu pedido en la puerta de tu casa. No necesitas tarjeta de crédito ni cuenta bancaria."
          />
          <FAQItem
            question="¿Es seguro comprar en su sitio web?"
            answer="Sí, es 100% seguro. Con el pago contraentrega, solo pagas cuando recibes tu producto. Puedes verificar tu pedido antes de realizar el pago al transportista."
          />
          <FAQItem
            question="¿Cuál es el costo de envío?"
            answer="El costo de envío se calcula automáticamente según tu ciudad y el peso del pedido. Lo verás antes de confirmar tu compra."
          />
          <FAQItem
            question="¿Cómo puedo realizar un pedido?"
            answer="Selecciona los productos que desees, agrégalos al carrito, completa tus datos de envío y confirma tu pedido. Pagarás en efectivo cuando recibas tu producto en casa."
          />
        </div>
      </div>
    </section>
  );
};
export default FAQSection;
