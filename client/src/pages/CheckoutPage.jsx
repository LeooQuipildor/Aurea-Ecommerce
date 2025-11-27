import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir al usuario
import { toast } from "sonner";

const CheckoutPage = () => {
  const { cart, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos al backend
      const orderData = {
        buyer,
        items: cart,
        total: totalPrice,
      };

      await axios.post("http://localhost:5000/api/orders", orderData);

      // Limpiar carrito y redirigir
      clearCart();
      toast.success("¡Compra realizada con éxito! 🚀");
      navigate("/"); // Volver al inicio
    } catch (error) {
      console.error("Error comprando:", error);
      toast.error("Hubo un error al procesar tu pedido.");
    }
  };

  if (cart.length === 0)
    return <div className="text-center py-20">No hay items para pagar.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Datos de Envío</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre Completo"
              required
              className="w-full border p-2 rounded"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              required
              className="w-full border p-2 rounded"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección de Envío"
              required
              className="w-full border p-2 rounded"
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              required
              className="w-full border p-2 rounded"
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Confirmar Compra (${totalPrice.toLocaleString()})
            </button>
          </form>
        </div>

        {/* Resumen */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Resumen</h2>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-300">
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
