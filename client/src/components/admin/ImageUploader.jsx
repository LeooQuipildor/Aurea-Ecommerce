import { useState } from "react";
import { X, Upload, Loader } from "lucide-react";
import { getApiUrl } from "../../config/api";
import axios from "axios";

const ImageUploader = ({ images = [], onImagesChange, maxImages = 5 }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > maxImages) {
      alert(`Solo puedes subir un máximo de ${maxImages} imágenes`);
      return;
    }

    setUploading(true);

    try {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      // Obtener token del localStorage
      const token = localStorage.getItem("token");

      // Subir a Cloudinary a través del backend
      const response = await axios.post(
        getApiUrl("/api/upload/upload"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Agregar las URLs devueltas por Cloudinary
      onImagesChange([...images, ...response.data.images]);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      alert(
        error.response?.data?.message ||
          "Error al subir imágenes. Por favor intenta de nuevo."
      );
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition-colors">
          <Upload size={20} />
          <span>Subir Imágenes</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading || images.length >= maxImages}
          />
        </label>
        <span className="text-sm text-gray-500">
          {images.length} / {maxImages} imágenes
        </span>
      </div>

      {uploading && (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader className="animate-spin" size={20} />
          <span>Subiendo a Cloudinary...</span>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
