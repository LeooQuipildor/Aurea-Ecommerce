import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";
import StatsCard from "../../components/admin/StatsCard";
import axios from "axios";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/admin/login");
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4C430]"></div>
        </div>
      </AdminLayout>
    );
  }

  // Preparar datos para gráficos
  const salesChartData =
    stats?.salesByMonth?.map((item) => ({
      name: `${item._id.month}/${item._id.year}`,
      ventas: item.total,
      pedidos: item.count,
    })) || [];

  const orderStatusData =
    stats?.ordersByStatus?.map((item) => ({
      name: item._id || "Sin estado",
      cantidad: item.count,
    })) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bienvenido de nuevo, {user?.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Productos"
            value={stats?.totalProducts || 0}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Total Pedidos"
            value={stats?.totalOrders || 0}
            icon={ShoppingCart}
            color="green"
          />
          <StatsCard
            title="Ingresos Totales"
            value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
            icon={DollarSign}
            color="yellow"
          />
          <StatsCard
            title="Stock Bajo"
            value={stats?.lowStockProducts?.length || 0}
            icon={AlertTriangle}
            color="red"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ventas por mes */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ventas por Mes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#F4C430"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pedidos por estado */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pedidos por Estado
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#F4C430" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders & Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pedidos recientes */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Pedidos Recientes
              </h2>
              <Clock size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${order.total}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No hay pedidos recientes
                </p>
              )}
            </div>
          </div>

          {/* Productos con stock bajo */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Stock Bajo</h2>
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <div className="space-y-3">
              {stats?.lowStockProducts?.length > 0 ? (
                stats.lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-red-600 font-bold">
                        {product.stock} unidades
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Todos los productos tienen stock suficiente
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
