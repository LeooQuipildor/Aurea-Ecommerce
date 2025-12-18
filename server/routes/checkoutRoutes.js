const express = require("express");
const router = express.Router();
const { validateCheckout } = require("../middleware/validators");
const { formLimiter } = require("../middleware/rateLimiter");
const Order = require("../models/Order");

/**
 * @route   POST /api/checkout
 * @desc    Procesar pedido de checkout
 * @access  Public
 */
router.post("/", formLimiter, validateCheckout, async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      whatsapp,
      email,
      direccion,
      referencia,
      departamento,
      ciudad,
      cart,
      totalPrice,
    } = req.body;

    // Generar ID de pedido único
    const orderId = `AUR${Date.now().toString().slice(-8)}`;

    // Crear pedido en la base de datos
    const order = await Order.create({
      orderId,
      customerData: {
        nombre,
        apellido,
        whatsapp,
        email: email.toLowerCase(),
        direccion,
        referencia,
        departamento,
        ciudad,
      },
      cart,
      totalPrice,
      status: "pending",
      paymentMethod: "cash_on_delivery",
    });

    // TODO: Enviar notificaciones
    // await sendOrderConfirmationEmail(email, order);
    // await sendWhatsAppNotification(whatsapp, order);

    res.status(201).json({
      success: true,
      message: "Pedido procesado exitosamente",
      data: {
        orderId: order.orderId,
        customerData: order.customerData,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Error al procesar checkout:", error);
    
    // Error de duplicado (orderId ya existe)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Error al generar ID de pedido. Por favor, intenta nuevamente.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al procesar el pedido",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/checkout/:orderId
 * @desc    Obtener detalles de un pedido
 * @access  Public
 */
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el pedido",
      error: error.message,
    });
  }
});

module.exports = router;
