const rateLimit = require("express-rate-limit");

/**
 * Rate limiter para formularios públicos (checkout, contacto)
 * Previene spam y ataques de fuerza bruta
 */
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 requests por IP en 15 minutos
  message: {
    success: false,
    message:
      "Demasiadas solicitudes desde esta IP. Por favor, intenta nuevamente en 15 minutos.",
  },
  standardHeaders: true, // Retorna info de rate limit en headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita headers `X-RateLimit-*`
});

/**
 * Rate limiter para login
 * Más estricto para prevenir ataques de fuerza bruta
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos de login por IP en 15 minutos
  message: {
    success: false,
    message:
      "Demasiados intentos de inicio de sesión. Por favor, intenta nuevamente en 15 minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // No cuenta requests exitosos
});

/**
 * Rate limiter general para API
 * Protege contra abuso general de la API
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por IP en 15 minutos
  message: {
    success: false,
    message: "Demasiadas solicitudes. Por favor, intenta nuevamente más tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  formLimiter,
  loginLimiter,
  apiLimiter,
};
