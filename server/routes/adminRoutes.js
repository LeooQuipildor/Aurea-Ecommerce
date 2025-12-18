const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/admin/stats
// @desc    Obtener estadísticas generales del dashboard
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    // Total de productos
    const totalProducts = await Product.countDocuments();

    // Total de pedidos
    const totalOrders = await Order.countDocuments();

    // Pedidos por estado
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Ingresos totales (suma de todos los pedidos completados)
    const revenueData = await Order.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Pedidos recientes (últimos 5)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customerName total status createdAt');

    // Productos con bajo stock (menos de 5 unidades)
    const lowStockProducts = await Product.find({ stock: { $lt: 5 } })
      .select('name stock category')
      .limit(10);

    // Ventas por mes (últimos 6 meses)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesByMonth = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      ordersByStatus,
      recentOrders,
      lowStockProducts,
      salesByMonth
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
});

// @route   GET /api/admin/products/stats
// @desc    Obtener estadísticas de productos
// @access  Private/Admin
router.get('/products/stats', protect, admin, async (req, res) => {
  try {
    // Productos por categoría
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Productos destacados
    const featuredProducts = await Product.countDocuments({ isFeatured: true });

    // Stock total
    const stockData = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: '$stock' }
        }
      }
    ]);

    const totalStock = stockData.length > 0 ? stockData[0].totalStock : 0;

    res.json({
      productsByCategory,
      featuredProducts,
      totalStock
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas de productos', error: error.message });
  }
});

// @route   GET /api/admin/orders
// @desc    Obtener todos los pedidos
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const query = status && status !== 'all' ? { status } : {};
    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener pedidos', 
      error: error.message 
    });
  }
});

// @route   GET /api/admin/contacts
// @desc    Obtener todos los mensajes de contacto
// @access  Private/Admin
router.get('/contacts', protect, admin, async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const { status, limit = 50, page = 1 } = req.query;

    const query = status && status !== 'all' ? { status } : {};
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error al obtener contactos', 
      error: error.message 
    });
  }
});

// @route   PATCH /api/admin/orders/:id/status
// @desc    Actualizar el estado de un pedido
// @access  Private/Admin
router.patch('/orders/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    // Validar que el estado sea válido
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido',
      });
    }

    // Actualizar el pedido
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado',
      });
    }

    res.json({
      success: true,
      message: 'Estado actualizado correctamente',
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el estado',
      error: error.message,
    });
  }
});

module.exports = router;
