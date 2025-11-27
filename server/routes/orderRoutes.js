const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders (Crear nueva orden)
router.post('/', async (req, res) => {
  try {
    const { buyer, items, total } = req.body;

    // Crear la orden
    const newOrder = new Order({
      buyer,
      items,
      total
    });

    // Guardar en DB
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Orden creada con éxito', orderId: savedOrder._id });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error: error.message });
  }
});

module.exports = router;