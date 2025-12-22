const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

// Ruta para subir múltiples imágenes (solo admin)
router.post('/upload', protect, upload.array('images', 5), async (req, res) => {
  try {
    // Verificar si es admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    // Obtener URLs de las imágenes subidas
    const imageUrls = req.files.map(file => file.path);
    
    res.json({
      success: true,
      images: imageUrls
    });
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(500).json({ message: 'Error al subir imágenes' });
  }
});

module.exports = router;
