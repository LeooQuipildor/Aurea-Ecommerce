const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');
const { validateAdminLogin } = require('../middleware/validators');
const { loginLimiter } = require('../middleware/rateLimiter');

// Generar JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Registrar nuevo usuario
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear usuario
    const user = await User.create({
      email,
      password,
      name,
      role: 'user' // Por defecto es user
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Public
router.post('/login', loginLimiter, validateAdminLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 [LOGIN] Intento de login recibido');
    console.log('📧 [LOGIN] Email:', email);
    console.log('🔑 [LOGIN] Password length:', password?.length);

    // Buscar usuario por email (incluir password)
    const user = await User.findOne({ email }).select('+password');
    
    console.log('👤 [LOGIN] Usuario encontrado:', user ? 'SÍ' : 'NO');

    if (!user) {
      console.log('❌ [LOGIN] Usuario no encontrado en DB');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    console.log('📋 [LOGIN] User data:', {
      id: user._id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      hasPassword: !!user.password
    });

    // Verificar contraseña
    console.log('🔐 [LOGIN] Verificando contraseña...');
    const isPasswordValid = await user.comparePassword(password);
    console.log('✅ [LOGIN] Contraseña válida:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ [LOGIN] Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si el usuario está activo
    console.log('🔍 [LOGIN] Verificando isActive:', user.isActive);
    if (!user.isActive) {
      console.log('❌ [LOGIN] Usuario inactivo');
      return res.status(401).json({ message: 'Usuario inactivo' });
    }

    console.log('🎉 [LOGIN] Login exitoso para:', email);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('💥 [LOGIN] Error:', error.message);
    console.error('💥 [LOGIN] Stack:', error.stack);
    res.status(400).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Obtener usuario actual
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener usuario', error: error.message });
  }
});

// @route   POST /api/auth/create-admin
// @desc    Crear usuario administrador (solo para desarrollo)
// @access  Public (en producción esto debería ser privado)
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear usuario admin
    const user = await User.create({
      email,
      password,
      name,
      role: 'admin'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        message: 'Administrador creado exitosamente'
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al crear administrador', error: error.message });
  }
});

module.exports = router;
