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

// 3. OBTENER un solo producto por ID (GET /api/products/:id)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error: error.message });
    }
});

module.exports = router;