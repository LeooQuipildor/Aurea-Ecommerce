import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/orders?status=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar pedidos");
      }

      const data = await response.json();
      setOrders(data.orders || []);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      toast.error("Error al cargar los pedidos");
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      toast.success("Estado actualizado correctamente");
      fetchOrders(); // Recargar pedidos
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      toast.error("Error al actualizar el estado del pedido");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const texts = {
      pending: "Pendiente",
      confirmed: "Confirmado",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
    };
    return texts[status] || status;
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedidos</h1>
        <p className="text-gray-600">Gestiona todos los pedidos de tu tienda</p>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { value: "all", label: "Todos" },
          { value: "pending", label: "Pendientes" },
          { value: "confirmed", label: "Confirmados" },
          { value: "shipped", label: "Enviados" },
          { value: "delivered", label: "Entregados" },
          { value: "cancelled", label: "Cancelados" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === item.value
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Lista de Pedidos */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay pedidos
          </h3>
          <p className="text-gray-600">
            {filter === "all"
              ? "Aún no has recibido ningún pedido"
              : `No hay pedidos ${getStatusText(filter).toLowerCase()}`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pedido #{order.orderId}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Selector de Estado */}
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    disabled={updatingStatus === order._id}
                    className={`px-3 py-1 rounded-full text-sm font-medium border-2 cursor-pointer transition-all ${getStatusColor(
                      order.status
                    )} ${
                      updatingStatus === order._id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-80"
                    }`}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  {updatingStatus === order._id && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Cliente
                  </h4>
                  <p className="text-sm text-gray-900">
                    {order.customerData.nombre} {order.customerData.apellido}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.customerData.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    +57 {order.customerData.whatsapp}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Dirección de Entrega
                  </h4>
                  <p className="text-sm text-gray-900">
                    {order.customerData.direccion}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.customerData.ciudad},{" "}
                    {order.customerData.departamento}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Ref: {order.customerData.referencia}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Productos
                </h4>
                <div className="space-y-2">
                  {order.cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-900">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-gray-600 font-medium">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-yellow-600">
                    ${order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/57${order.customerData.whatsapp}?text=Hola%20${order.customerData.nombre},%20sobre%20tu%20pedido%20${order.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Contactar por WhatsApp
                </a>
                <a
                  href={`mailto:${order.customerData.email}?subject=Pedido%20${order.orderId}`}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Enviar Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
