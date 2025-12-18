const express = require("express");
const router = express.Router();
const { validateContact } = require("../middleware/validators");

/**
 * @route   POST /api/contact
 * @desc    Procesar formulario de contacto
 * @access  Public
 */
router.post("/", validateContact, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Datos sanitizados y validados
    const contactData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      message,
      createdAt: new Date(),
      status: "pending", // pending, read, replied
    };

    // TODO: Guardar en base de datos
    // const contact = await Contact.create(contactData);

    // TODO: Enviar notificaciones
    // await sendContactNotificationEmail(contactData);
    // await notifyAdminNewContact(contactData);

    res.status(201).json({
      success: true,
      message: "Mensaje enviado exitosamente. Te responderemos pronto.",
      data: {
        firstName,
        lastName,
        email: contactData.email,
      },
    });
  } catch (error) {
    console.error("Error al procesar contacto:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar el mensaje",
      error: error.message,
    });
  }
});

module.exports = router;
