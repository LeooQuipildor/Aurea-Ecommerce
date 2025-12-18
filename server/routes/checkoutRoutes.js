const express = require("express");
const router = express.Router();
const { validateCheckout } = require("../middleware/validators");

/**
 * @route   POST /api/checkout
 * @desc    Procesar pedido de checkout
 * @access  Public
 */
router.post("/", validateCheckout, async (req, res) => {
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

    // Aquí puedes:
    // 1. Guardar el pedido en la base de datos
    // 2. Enviar email de confirmación
    // 3. Notificar al admin por WhatsApp
    // 4. Generar ID de pedido único

    const orderId = `AUR${Date.now().toString().slice(-8)}`;

    // Datos sanitizados y validados
    const orderData = {
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
      createdAt: new Date(),
    };

    // TODO: Guardar en base de datos
    // const order = await Order.create(orderData);

    // TODO: Enviar notificaciones
    // await sendOrderConfirmationEmail(email, orderData);
    // await sendWhatsAppNotification(whatsapp, orderData);

    res.status(201).json({
      success: true,
      message: "Pedido procesado exitosamente",
      data: {
        orderId,
        customerData: orderData.customerData,
      },
    });
  } catch (error) {
    console.error("Error al procesar checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar el pedido",
      error: error.message,
    });
  }
});

module.exports = router;
