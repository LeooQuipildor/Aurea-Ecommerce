const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
// --- IMPORTAR RUTAS ---
const productRoutes = require('./routes/productRoutes');

// Configurar variables de entorno
dotenv.config();

const app = express();

// --- Middlewares (Configuraciones intermedias) ---
// Permite que React (u otros dominios) consulten tu API
app.use(cors());
// Permite que tu servidor entienda datos en formato JSON (lo que envía React)
app.use(express.json());

// --- USAR RUTAS ---
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

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