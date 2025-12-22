const { body, validationResult } = require("express-validator");

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validaciones para el formulario de checkout
 */
const validateCheckout = [
  // Nombre
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 25 })
    .withMessage("El nombre debe tener entre 2 y 25 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras")
    .escape(), // Sanitización contra XSS

  // Apellido
  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 25 })
    .withMessage("El apellido debe tener entre 2 y 25 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras")
    .escape(),

  // WhatsApp
  body("whatsapp")
    .trim()
    .notEmpty()
    .withMessage("El número de WhatsApp es obligatorio")
    .matches(/^3[0-9]{9}$/)
    .withMessage(
      "El número debe tener exactamente 10 dígitos y empezar con 3"
    ),

  // Email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .isLength({ max: 50 })
    .withMessage("El email no puede exceder 50 caracteres")
    .normalizeEmail(), // Sanitización de email

  // Dirección
  body("direccion")
    .trim()
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ min: 5, max: 200 })
    .withMessage("La dirección debe tener entre 5 y 200 caracteres")
    .matches(/\d/)
    .withMessage("La dirección debe incluir un número")
    .escape(),

  // Referencia
  body("referencia")
    .trim()
    .notEmpty()
    .withMessage("El punto de referencia es obligatorio")
    .isLength({ min: 3, max: 300 })
    .withMessage("La referencia debe tener entre 3 y 300 caracteres")
    .escape(),

  // Departamento
  body("departamento")
    .trim()
    .notEmpty()
    .withMessage("Debes seleccionar un departamento")
    .escape(),

  // Ciudad
  body("ciudad")
    .trim()
    .notEmpty()
    .withMessage("Debes seleccionar un municipio")
    .escape(),

  handleValidationErrors,
];

/**
 * Validaciones para el formulario de contacto
 */
const validateContact = [
  // Nombre
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 25 })
    .withMessage("El nombre debe tener entre 2 y 25 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras")
    .escape(),

  // Apellido
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 25 })
    .withMessage("El apellido debe tener entre 2 y 25 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras")
    .escape(),

  // Email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .isLength({ max: 50 })
    .withMessage("El email no puede exceder 50 caracteres")
    .normalizeEmail(),

  // Teléfono
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^3[0-9]{9}$/)
    .withMessage(
      "El número debe tener exactamente 10 dígitos y empezar con 3"
    ),

  // Mensaje
  body("message")
    .trim()
    .notEmpty()
    .withMessage("El mensaje es obligatorio")
    .isLength({ min: 10, max: 500 })
    .withMessage("El mensaje debe tener entre 10 y 500 caracteres")
    .escape(),

  handleValidationErrors,
];

/**
 * Validaciones para crear/editar productos (Admin)
 */
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres")
    .escape(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 1000 })
    .withMessage("La descripción debe tener entre 10 y 1000 caracteres")
    .escape(),

  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número positivo"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .escape(),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo"),

  handleValidationErrors,
];

/**
 * Validaciones para login de admin
 */
const validateAdminLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  handleValidationErrors,
];

module.exports = {
  validateCheckout,
  validateContact,
  validateProduct,
  validateAdminLogin,
  handleValidationErrors,
};
