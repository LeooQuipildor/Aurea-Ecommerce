import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { getApiUrl } from "../../config/api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Package, DollarSign } from "lucide-react";

const AdminAnalytics = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/admin/login");
      return;
    }

    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [statsRes, productStatsRes] = await Promise.all([
        axios.get(getApiUrl("/api/admin/stats")),
        axios.get(getApiUrl("/api/admin/products/stats")),
      ]);

      setStats({
        ...statsRes.data,
        productStats: productStatsRes.data,
      });
    } catch (error) {
      console.error("Error al obtener analytics:", error);
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

  const COLORS = ["#F4C430", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6"];

  const salesData =
    stats?.salesByMonth?.map((item) => ({
      name: `${item._id.month}/${item._id.year}`,
      ventas: item.total,
      pedidos: item.count,
    })) || [];

  const categoryData =
    stats?.productStats?.productsByCategory?.map((item) => ({
      name: item._id,
      value: item.count,
    })) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Análisis detallado de tu negocio</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Ingresos Totales</p>
                <p className="text-3xl font-bold mt-2">
                  ${stats?.totalRevenue?.toLocaleString() || 0}
                </p>
              </div>
              <DollarSign size={40} className="opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Pedidos</p>
                <p className="text-3xl font-bold mt-2">
                  {stats?.totalOrders || 0}
                </p>
              </div>
              <TrendingUp size={40} className="opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Productos</p>
                <p className="text-3xl font-bold mt-2">
                  {stats?.totalProducts || 0}
                </p>
              </div>
              <Package size={40} className="opacity-80" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ventas por mes */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tendencia de Ventas
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#F4C430"
                  strokeWidth={3}
                  name="Ventas ($)"
                />
                <Line
                  type="monotone"
                  dataKey="pedidos"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Pedidos"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Productos por categoría */}
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Productos por Categoría
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Resumen de Inventario
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50">
                <span className="text-gray-700">Stock Total</span>
                <span className="font-bold text-gray-900">
                  {stats?.productStats?.totalStock || 0} unidades
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50">
                <span className="text-gray-700">Productos Destacados</span>
                <span className="font-bold text-gray-900">
                  {stats?.productStats?.featuredProducts || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50">
                <span className="text-gray-700">Productos con Stock Bajo</span>
                <span className="font-bold text-red-600">
                  {stats?.lowStockProducts?.length || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Estado de Pedidos
            </h2>
            <div className="space-y-3">
              {stats?.ordersByStatus?.map((status) => (
                <div
                  key={status._id}
                  className="flex justify-between items-center p-3 bg-gray-50"
                >
                  <span className="text-gray-700 capitalize">
                    {status._id || "Sin estado"}
                  </span>
                  <span className="font-bold text-gray-900">
                    {status.count} pedidos
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
