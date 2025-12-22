import { useState } from "react";
import { X, Upload, Loader } from "lucide-react";

const ImageUploader = ({ images = [], onImagesChange, maxImages = 5 }) => {
  const [uploading, setUploading] = useState(false);

  // Función para comprimir imagen
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Redimensionar si es muy grande (max 1200px)
          const maxSize = 1200;
          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Comprimir a JPEG con calidad 0.7
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedDataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > maxImages) {
      alert(`Solo puedes subir un máximo de ${maxImages} imágenes`);
      return;
    }

    setUploading(true);

    // Comprimir y convertir imágenes
    const newImages = await Promise.all(
      files.map((file) => compressImage(file))
    );

    onImagesChange([...images, ...newImages]);
    setUploading(false);
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
          <span>Subiendo imágenes...</span>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
