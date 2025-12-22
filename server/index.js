const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Configurar variables de entorno
dotenv.config();

const app = express();

// --- Middlewares (Configuraciones intermedias) ---
// Permite que React (u otros dominios) consulten tu API
app.use(cors());
// Permite que tu servidor entienda datos en formato JSON (lo que envía React)
// Aumentar límite para permitir imágenes en base64
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- USAR RUTAS ---
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/contact', contactRoutes);

// --- Rutas de Prueba ---
app.get('/', (req, res) => {
    res.send('API de Aurea E-commerce funcionando 🚀');
});

// --- Conexión a Base de Datos y Servidor ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB Exitosamente');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error conectando a MongoDB:', error.message);
    });