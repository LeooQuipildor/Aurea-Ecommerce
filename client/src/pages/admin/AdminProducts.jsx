import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { getApiUrl } from "../../config/api";

const AdminProducts = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/admin/login");
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(getApiUrl("/api/products"));
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
      return;
    }

    try {
      await axios.delete(getApiUrl(`/api/products/${id}`));
      toast.success("Producto eliminado exitosamente");
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar producto");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4C430]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
            <p className="text-gray-600 mt-1">
              Gestiona tu catálogo de productos
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="flex items-center gap-2 px-6 py-3 bg-[#F4C430] text-black font-semibold hover:bg-[#f3a51d] transition-colors"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              />
            </div>

            {/* Category filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oferta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destacado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 object-cover border border-gray-200"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.isOnSale && product.salePrice ? (
                          <div>
                            <div className="font-semibold text-green-600">
                              ${product.salePrice.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400 line-through">
                              ${product.price.toLocaleString()}
                            </div>
                          </div>
                        ) : (
                          <div>${product.price.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.isOnSale && product.salePrice ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold bg-red-100 text-red-800">
                            {(
                              ((product.price - product.salePrice) /
                                product.price) *
                              100
                            ).toFixed(0)}
                            % OFF
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold ${
                            product.stock < 5
                              ? "bg-red-100 text-red-800"
                              : product.stock < 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.isFeatured ? (
                          <span className="text-[#F4C430]">★ Sí</span>
                        ) : (
                          <span className="text-gray-400">☆ No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {product.distributorLink && (
                            <a
                              href={product.distributorLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 transition-colors"
                              title="Ver en distribuidor"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                          <button
                            onClick={() =>
                              navigate(`/admin/products/edit/${product._id}`)
                            }
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(product._id, product.name)
                            }
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No hay productos
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterCategory !== "all"
                  ? "No se encontraron productos con los filtros aplicados"
                  : "Comienza creando un nuevo producto"}
              </p>
              {!searchTerm && filterCategory === "all" && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/admin/products/new")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4C430] text-black font-semibold hover:bg-[#f3a51d] transition-colors"
                  >
                    <Plus size={20} />
                    Nuevo Producto
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredProducts.length > 0 && (
          <div className="text-sm text-gray-600">
            Mostrando {filteredProducts.length} de {products.length} productos
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
