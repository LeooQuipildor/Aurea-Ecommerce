const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: 0
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'], 
    // Por ahora guardaremos URLs, luego usaremos Cloudinary
  },
  images: {
    type: [String],
    default: []
  },
  materials: {
    type: String,
    default: ''
  },
  care: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['Collares', 'Aretes', 'Pulseras', 'Anillos']
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  isFeatured: {
    type: Boolean,
    default: false // Para mostrar en el Home como "Destacado"
  }
}, {
  timestamps: true // Esto crea automáticamente campos createdAt y updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;