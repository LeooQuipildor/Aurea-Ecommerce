import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUploader from "../../components/admin/ImageUploader";
import axios from "axios";
import { Save, ArrowLeft, Plus, X, Link as LinkIcon } from "lucide-react";
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
    category: "Collares",
    stock: "",
    isFeatured: false,
    image: "",
    materials: "",
    care: "",
    colors: [],
    isOnSale: false,
    salePrice: "",
    distributorLink: "",
  });
  const [images, setImages] = useState([]);
  const [newColor, setNewColor] = useState("");

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
        materials: product.materials || "",
        care: product.care || "",
        colors: product.colors || [],
        isOnSale: product.isOnSale || false,
        salePrice: product.salePrice || "",
        distributorLink: product.distributorLink || "",
      });
      // Cargar todas las imágenes (images array o solo image)
      if (product.images && product.images.length > 0) {
        setImages(product.images);
      } else if (product.image) {
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

  const addColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const removeColor = (colorToRemove) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color !== colorToRemove),
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

    // Validar precio de oferta
    if (formData.isOnSale) {
      if (!formData.salePrice || formData.salePrice <= 0) {
        toast.error("El precio de oferta debe ser mayor a 0");
        setLoading(false);
        return;
      }
      if (parseFloat(formData.salePrice) >= parseFloat(formData.price)) {
        toast.error("El precio de oferta debe ser menor al precio normal");
        setLoading(false);
        return;
      }
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      salePrice: formData.isOnSale ? parseFloat(formData.salePrice) : null,
      image: images[0], // Primera imagen como principal
      images: images, // Todas las imágenes
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

          {/* Materiales */}
          <div>
            <label
              htmlFor="materials"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Materiales
            </label>
            <textarea
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              placeholder="Ej: Plata 925, Baño de oro 18k, Piedras naturales..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Describe los materiales utilizados en el producto
            </p>
          </div>

          {/* Cuidados */}
          <div>
            <label
              htmlFor="care"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cuidados
            </label>
            <textarea
              id="care"
              name="care"
              value={formData.care}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              placeholder="Ej: Evitar contacto con agua, guardar en lugar seco..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Instrucciones de cuidado y mantenimiento
            </p>
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
              <option value="Collares">Collares</option>
              <option value="Aretes">Aretes</option>
              <option value="Pulseras">Pulseras</option>
              <option value="Anillos">Anillos</option>
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

          {/* Colores Disponibles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colores Disponibles
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addColor();
                  }
                }}
                placeholder="Ej: Plateado, Dorado, Oro Rosa..."
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              />
              <button
                type="button"
                onClick={addColor}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
            {formData.colors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.colors.map((color, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Agrega los colores o variantes disponibles para este producto
            </p>
          </div>

          {/* Ofertas */}
          <div className="border border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                checked={formData.isOnSale}
                onChange={handleChange}
                className="h-4 w-4 text-[#F4C430] focus:ring-[#F4C430] border-gray-300"
              />
              <label
                htmlFor="isOnSale"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Marcar como producto en oferta
              </label>
            </div>
            {formData.isOnSale && (
              <div>
                <label
                  htmlFor="salePrice"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Precio en Oferta ($) *
                </label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
                  placeholder="0.00"
                />
                {formData.price && formData.salePrice && (
                  <p className="text-xs text-green-600 mt-1">
                    Descuento:{" "}
                    {(
                      ((formData.price - formData.salePrice) / formData.price) *
                      100
                    ).toFixed(0)}
                    %
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Link del Distribuidor (Solo Admin) */}
          <div className="border border-gray-200 p-4 bg-blue-50">
            <label
              htmlFor="distributorLink"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <LinkIcon size={18} />
              Link del Distribuidor (Interno - Solo Admins)
            </label>
            <input
              type="url"
              id="distributorLink"
              name="distributorLink"
              value={formData.distributorLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-[#F4C430]"
              placeholder="https://distribuidor.com/producto/123"
            />
            <p className="text-xs text-gray-500 mt-1">
              Este link solo será visible para administradores y te permite
              acceder rápidamente al producto en el sitio de tu distribuidor
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
