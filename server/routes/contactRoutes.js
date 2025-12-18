const express = require("express");
const router = express.Router();
const { validateContact } = require("../middleware/validators");
const { formLimiter } = require("../middleware/rateLimiter");
const Contact = require("../models/Contact");

/**
 * @route   POST /api/contact
 * @desc    Procesar formulario de contacto
 * @access  Public
 */
router.post("/", formLimiter, validateContact, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Crear contacto en la base de datos
    const contact = await Contact.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      message,
      status: "pending",
    });

    // TODO: Enviar notificaciones
    // await sendContactNotificationEmail(contact);
    // await notifyAdminNewContact(contact);

    res.status(201).json({
      success: true,
      message: "Mensaje enviado exitosamente. Te responderemos pronto.",
      data: {
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        createdAt: contact.createdAt,
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

/**
 * @route   GET /api/contact
 * @desc    Obtener todos los mensajes de contacto (Admin)
 * @access  Private/Admin
 */
router.get("/", async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener mensajes",
      error: error.message,
    });
  }
});

module.exports = router;
