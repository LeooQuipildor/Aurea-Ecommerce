import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, totalItems } = useCart();

  // Calcular el precio total del carrito
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Estado vacío: Si no hay productos, mostramos un mensaje amigable
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mb-8">
          Parece que aún no has añadido nada.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Tu Carrito ({totalItems} productos)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LISTA DE PRODUCTOS (Izquierda) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              {/* Imagen pequeña */}
              <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm text-gray-600">
                    Cantidad:{" "}
                    <span className="font-bold text-gray-900">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 text-lg">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-400">
                        (${item.price.toLocaleString()} c/u)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón Eliminar */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-gray-400 hover:text-red-500 transition self-start"
                title="Eliminar producto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* RESUMEN DE PAGO (Derecha) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Resumen del pedido
          </h2>

          <div className="space-y-2 mb-4 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${totalPrice.toLocaleString()}
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Proceder al Pago
          </button>

          <Link
            to="/"
            className="block text-center mt-4 text-sm text-gray-500 hover:text-blue-600 underline"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
