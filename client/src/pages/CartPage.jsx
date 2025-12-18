import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalItems } = useCart();

  // Calcular el precio total del carrito
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Estado vacío: Si no hay productos, mostramos un mensaje amigable
  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-32">
          {/* Icono de carrito vacío */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>

          <h2 className="font-thin text-5xl md:text-6xl text-gray-900 mb-4">
            Tu Carrito está Vacío
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-12 max-w-md">
            Descubrí nuestra colección de joyas únicas y encontrá la pieza
            perfecta para vos.
          </p>
          <Link to="/catalogo">
            <Button>Explorar Catálogo</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-24 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-thin text-6xl md:text-7xl text-gray-900 mb-2">
            Tu Carrito
          </h1>
          <p className="text-gray-500 text-base">
            {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu
            carrito
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LISTA DE PRODUCTOS (Izquierda - 2 columnas) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 p-4 md:p-6 hover:border-gray-300 transition-colors duration-300"
                >
                  <div className="flex gap-3 md:gap-6">
                    {/* Imagen */}
                    <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info del producto */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <Link to={`/product/${item._id}`}>
                          <h3 className="text-base md:text-xl font-light text-gray-900 mb-1 hover:text-gray-600 transition-colors cursor-pointer truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-3 md:mt-4 gap-3">
                        {/* Cantidad */}
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 md:w-8 md:h-8 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="text-gray-900 font-light text-base md:text-lg w-6 md:w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 md:w-8 md:h-8 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center"
                          >
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Precio */}
                        <div className="text-left sm:text-right">
                          <p className="text-lg md:text-2xl font-light text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-400 mt-1">
                              ${item.price.toLocaleString()} c/u
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors self-start"
                      title="Eliminar producto"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RESUMEN DE PAGO (Derecha - 1 columna) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 p-8 sticky top-24">
                <h2 className="font-semibold text-2xl text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6 text-gray-600">
                  <div className="flex justify-between text-base">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-semibold">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Envío</span>
                    <span className="text-green-600 font-semibold">Gratis</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-6 mb-8 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Total
                  </span>
                  <span className="text-3xl font-semibold text-gray-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <Link to="/checkout" className="block mb-4">
                  <Button fullWidth>Realizar mi Pedido</Button>
                </Link>

                <Link
                  to="/catalogo"
                  className="block text-center text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
                >
                  Seguir Comprando
                </Link>

                {/* Garantías */}
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-900 text-sm font-light">
                        Compra Segura
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        Protección garantizada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-900 text-sm font-light">
                        Envío Gratis
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        En todas las compras
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-900 text-sm font-light">
                        Devoluciones
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        30 días para cambios
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
