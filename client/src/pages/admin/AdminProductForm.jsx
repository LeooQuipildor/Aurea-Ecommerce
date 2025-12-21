import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUploader from "../../components/admin/ImageUploader";
import axios from "axios";
import { Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getApiUrl } from "../../config/api";

const AdminProductForm = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Ropa",
    stock: "",
    isFeatured: false,
    image: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/admin/login");
      return;
    }

    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(getApiUrl(`/api/products/${id}`));
      const product = response.data;
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        isFeatured: product.isFeatured,
        image: product.image,
      });
      if (product.image) {
        setImages([product.image]);
      }
    } catch (error) {
      console.error("Error al obtener producto:", error);
      toast.error("Error al cargar producto");
      navigate("/admin/products");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock
    ) {
      toast.error("Por favor completa todos los campos obligatorios");
      setLoading(false);
      return;
    }

    if (images.length === 0) {
      toast.error("Por favor agrega al menos una imagen");
      setLoading(false);
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: images[0], // Por ahora solo usamos la primera imagen
    };

    try {
      if (isEditMode) {
        await axios.put(getApiUrl(`/api/products/${id}`), productData);
        toast.success("Producto actualizado exitosamente");
      } else {
        await axios.post(getApiUrl("/api/products"), productData);
        toast.success("Producto creado exitosamente");
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error(error.response?.data?.message || "Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Volver a productos
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Editar Producto" : "Nuevo Producto"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode
              ? "Actualiza la información del producto"
              : "Agrega un nuevo producto a tu catálogo"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm border border-gray-200 p-6 space-y-6"
        >
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre del Producto *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              placeholder="Ej: Collar de Plata Elegante"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              placeholder="Describe el producto en detalle..."
            />
          </div>

          {/* Precio y Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Precio ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock (unidades) *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
                placeholder="0"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Categoría *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
            >
              <option value="Ropa">Ropa</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Hogar">Hogar</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes del Producto *
            </label>
            <ImageUploader
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
            <p className="text-xs text-gray-500 mt-2">
              Puedes subir hasta 5 imágenes. La primera será la imagen
              principal.
            </p>
          </div>

          {/* Destacado */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 text-[#F4C430] focus:ring-[#F4C430] border-gray-300"
            />
            <label
              htmlFor="isFeatured"
              className="ml-2 block text-sm text-gray-700"
            >
              Marcar como producto destacado (aparecerá en la página principal)
            </label>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-[#F4C430] text-black font-semibold hover:bg-[#f3a51d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading
                ? "Guardando..."
                : isEditMode
                ? "Actualizar Producto"
                : "Crear Producto"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProductForm;
