const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Importamos tu modelo

// 1. OBTENER todos los productos (GET /api/products)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});

// 2. CREAR un nuevo producto (POST /api/products)
router.post('/', async (req, res) => {
    try {
        // Creamos el producto con los datos que vienen del frontend (req.body)
        const newProduct = new Product(req.body);
        
        // Guardamos en la base de datos
        const savedProduct = await newProduct.save();
        
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear producto', error: error.message });
    }
});

module.exports = router;