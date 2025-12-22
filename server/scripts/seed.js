// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Datos de prueba
const products = [
  {
    name: "Camiseta Basic Blanca",
    description: "El básico indispensable. Algodón orgánico de alto gramaje, corte regular fit perfecto para cualquier ocasión.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    category: "Ropa",
    stock: 50
  },
  {
    name: "Auriculares Noise Cancelling",
    description: "Sumérgete en tu música. Cancelación de ruido activa, 30 horas de batería y almohadillas de memoria.",
    price: 150000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    category: "Electrónica",
    stock: 20
  },
  {
    name: "Sneakers Urbanas Grises",
    description: "Diseño moderno y comodidad para todo el día. Suela de caucho antideslizante y tejido transpirable.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Ropa",
    stock: 15
  },
  {
    name: "Mochila Laptop Impermeable",
    description: "Protege tu equipo con estilo. Compartimentos inteligentes, puerto USB de carga y tela resistente al agua.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    category: "Accesorios",
    stock: 30
  },
  {
    name: "Reloj Minimalista Negro",
    description: "Elegancia pura. Correa de cuero genuino, movimiento de cuarzo japonés y resistencia al agua 5ATM.",
    price: 60000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    category: "Accesorios",
    stock: 10
  },
  {
    name: "Gafas de Sol Aviador",
    description: "Un clásico renovado. Lentes polarizadas con protección UV400 y montura ligera de aleación.",
    price: 32000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    category: "Accesorios",
    stock: 25
  },
  {
    name: "Cámara Instantánea Retro",
    description: "Captura momentos al instante. Diseño vintage, flash automático y modo selfie incluido.",
    price: 120000,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800",
    category: "Electrónica",
    stock: 8
  },
  {
    name: "Sudadera Hoodie Beige",
    description: "Confort máximo. Interior de felpa suave, bolsillo canguro y capucha ajustable.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    category: "Ropa",
    stock: 40
  }
];

const seedDB = async () => {
  try {
    // 1. Conectar a la DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Conectado a MongoDB...');

    // 2. Borrar todo lo anterior (Limpieza)
    await Product.deleteMany({});
    console.log('🧹 Productos anteriores eliminados');

    // 3. Insertar los nuevos
    await Product.insertMany(products);
    console.log('🌱 Base de datos sembrada con éxito!');

    // 4. Salir
    process.exit();
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
};

seedDB();