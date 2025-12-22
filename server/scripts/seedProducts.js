// Script para agregar productos de ejemplo a MongoDB Atlas
// Ejecutar: node seedProducts.js

require('dotenv').config();
const mongoose = require('mongoose');

// Conectar a MongoDB Atlas (usa la variable de entorno)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aurea';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 10 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: "Collar Elegante Dorado",
    description: "Collar de lujo con acabado dorado, perfecto para ocasiones especiales. Diseño elegante y atemporal.",
    price: 89000,
    category: "Collares",
    image: "/images/collar1.png",
    stock: 15,
    isFeatured: true
  },
  {
    name: "Anillo Solitario Plata",
    description: "Anillo solitario en plata 925 con diseño moderno. Ideal para uso diario o eventos especiales.",
    price: 65000,
    category: "Anillos",
    image: "/images/anillo1.png",
    stock: 20,
    isFeatured: true
  },
  {
    name: "Pulsera Minimalista",
    description: "Pulsera de diseño minimalista con acabado brillante. Perfecta para combinar con cualquier outfit.",
    price: 45000,
    category: "Pulseras",
    image: "/images/pulsera1.png",
    stock: 25,
    isFeatured: false
  },
  {
    name: "Aretes Colgantes",
    description: "Aretes colgantes elegantes con diseño único. Ideales para lucir en cualquier ocasión.",
    price: 55000,
    category: "Aretes",
    image: "/images/aretes1.png",
    stock: 18,
    isFeatured: true
  },
  {
    name: "Collar Cadena Fina",
    description: "Collar de cadena fina con dije delicado. Perfecto para un look sofisticado y elegante.",
    price: 75000,
    category: "Collares",
    image: "/images/collar2.png",
    stock: 12,
    isFeatured: false
  },
  {
    name: "Anillo Apilable Set",
    description: "Set de 3 anillos apilables en diferentes acabados. Versátiles y modernos.",
    price: 95000,
    category: "Anillos",
    image: "/images/anillo2.png",
    stock: 10,
    isFeatured: false
  }
];

async function seedProducts() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    // Verificar si ya hay productos
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts > 0) {
      console.log(`⚠️  Ya existen ${existingProducts} productos en la base de datos.`);
      console.log('¿Deseas continuar? Esto agregará más productos.');
      // Para producción, podrías descomentar la siguiente línea para evitar duplicados
      // process.exit(0);
    }

    console.log('📦 Agregando productos de ejemplo...');
    
    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`✅ Agregado: ${product.name}`);
    }

    console.log(`\n🎉 ¡Listo! Se agregaron ${sampleProducts.length} productos exitosamente.`);
    console.log('🌐 Ahora puedes ver los productos en tu sitio web.');
    
    await mongoose.connection.close();
    console.log('👋 Conexión cerrada.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedProducts();
