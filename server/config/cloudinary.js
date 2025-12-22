require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

let storage;
let upload;

// Configurar Cloudinary solo si las variables están definidas
if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  // Configurar almacenamiento de Cloudinary
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'aurea-jewelry', // Carpeta donde se guardarán las imágenes
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 1200, height: 1600, crop: 'limit' }, // Limitar tamaño máximo
        { quality: 'auto' } // Optimización automática de calidad
      ]
    }
  });

  upload = multer({ storage });
  console.log('✅ Cloudinary configurado correctamente');
  
} else {
  console.warn('⚠️  Cloudinary no configurado - Agrega las variables de entorno CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  
  // Crear un upload mock para desarrollo sin Cloudinary
  upload = multer({ dest: 'uploads/' });
}

module.exports = { cloudinary, upload };

