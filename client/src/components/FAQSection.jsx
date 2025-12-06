import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-200 text-lg font-light">{question}</span>
        <span className="text-gray-400 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 font-light">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-white mb-12">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-2">
          <FAQItem
            question="¿Hacen envíos a todo el país?"
            answer="Sí, realizamos envíos a todas las provincias a través de correo privado."
          />
          <FAQItem
            question="¿Qué métodos de pago aceptan?"
            answer="Aceptamos todas las tarjetas de crédito, débito y transferencias bancarias."
          />
          <FAQItem
            question="¿Es seguro comprar en su sitio web?"
            answer="Totalmente. Utilizamos cifrado SSL para proteger todos tus datos personales y de pago."
          />
          <FAQItem
            question="¿Cuál es el costo de envío?"
            answer="El envío es gratuito en compras superiores a $50.000. Para montos menores, se calcula en el checkout."
          />
        </div>
      </div>
    </section>
  );
};
export default FAQSection;
