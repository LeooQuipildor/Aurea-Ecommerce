import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Obtener los datos del pedido del state de navegación
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Si no hay datos, redirigir al home
      navigate("/");
    }
  }, [location, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderId, customerData, cart, totalPrice } = orderData;

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const message = `Hola! Quiero confirmar mi pedido:

*ID de Compra:* ${orderId}
*Nombre:* ${customerData.nombre} ${customerData.apellido}

Me comprometo a pagar el monto total de $${totalPrice.toLocaleString()} al momento de recibir mi pedido en la dirección indicada.

Gracias!`;

    return encodeURIComponent(message);
  };

  const whatsappNumber = "5491112345678"; // Reemplazar con tu número de WhatsApp
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section con Check Verde */}
      <div className="pt-32 pb-12 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          {/* Check Verde Animado */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                <svg
                  className="w-14 h-14 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Círculo de fondo animado */}
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
            </div>
          </div>

          <h1 className="font-thin text-5xl md:text-6xl text-gray-900 mb-4">
            ¡Pedido Registrado!
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Tu pedido ha sido registrado exitosamente
          </p>
          <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">ID de Compra</p>
            <p className="text-2xl font-bold text-gray-900 font-mono">
              #{orderId}
            </p>
          </div>
        </div>
      </div>

      {/* Instrucciones Importantes */}
      <div className="py-12 px-4 bg-yellow-50 border-y-2 border-yellow-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-yellow-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                ⚠️ Importante: Confirmá tu Pedido
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                <strong>El envío solo se realizará</strong> si nos enviás un
                mensaje por WhatsApp confirmando tu pedido. Por favor, incluí:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>ID de Compra:</strong> #{orderId}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>Nombre completo:</strong> {customerData.nombre}{" "}
                    {customerData.apellido}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    Confirmación de que te comprometés a pagar el total de{" "}
                    <strong>${totalPrice.toLocaleString()}</strong> al recibir
                    tu pedido
                  </span>
                </li>
              </ul>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Confirmar Pedido por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen del Pedido */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Resumen de tu Pedido
          </h2>

          {/* Información del Cliente */}
          <div className="bg-gray-50 border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información de Entrega
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Nombre completo</p>
                <p className="text-gray-900 font-medium">
                  {customerData.nombre} {customerData.apellido}
                </p>
              </div>
              <div>
                <p className="text-gray-500">WhatsApp</p>
                <p className="text-gray-900 font-medium">
                  {customerData.whatsapp}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Dirección</p>
                <p className="text-gray-900 font-medium">
                  {customerData.direccion}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Referencia</p>
                <p className="text-gray-900 font-medium">
                  {customerData.referencia}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Provincia</p>
                <p className="text-gray-900 font-medium">
                  {customerData.departamento}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Ciudad</p>
                <p className="text-gray-900 font-medium">
                  {customerData.ciudad}
                </p>
              </div>
              {customerData.email && (
                <div className="md:col-span-2">
                  <p className="text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">
                    {customerData.email}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Productos */}
          <div className="bg-white border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Productos
            </h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-500 mt-1">
                        ${item.price.toLocaleString()} c/u
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-900 text-white p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-base">Subtotal</span>
              <span className="text-lg font-semibold">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
              <span className="text-base">Envío</span>
              <span className="text-lg font-semibold text-green-400">
                Gratis
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total a Pagar</span>
              <span className="text-3xl font-bold">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Pago contra entrega en efectivo
            </p>
          </div>

          {/* Botón para volver */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-block border-b-2 border-gray-900 pb-1 text-base uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmationPage;
