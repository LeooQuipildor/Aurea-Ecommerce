/**
 * Script para limpiar pedidos inválidos de la base de datos
 * Ejecutar con: node cleanOrders.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./models/Order");

const cleanOrders = async () => {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB\n");

    // Buscar pedidos inválidos (sin customerData o sin orderId)
    const invalidOrders = await Order.find({
      $or: [
        { customerData: { $exists: false } },
        { customerData: null },
        { orderId: { $exists: false } },
        { orderId: null },
      ],
    });

    console.log(`📊 Pedidos inválidos encontrados: ${invalidOrders.length}\n`);

    if (invalidOrders.length === 0) {
      console.log("✅ No hay pedidos inválidos para eliminar");
      process.exit(0);
    }

    // Mostrar detalles de los pedidos inválidos
    invalidOrders.forEach((order, index) => {
      console.log(`${index + 1}. ID: ${order._id}`);
      console.log(`   - orderId: ${order.orderId || "❌ FALTA"}`);
      console.log(`   - customerData: ${order.customerData ? "✅" : "❌ FALTA"}`);
      console.log(`   - createdAt: ${order.createdAt}`);
      console.log("");
    });

    // Eliminar pedidos inválidos
    const result = await Order.deleteMany({
      $or: [
        { customerData: { $exists: false } },
        { customerData: null },
        { orderId: { $exists: false } },
        { orderId: null },
      ],
    });

    console.log(`🗑️  Pedidos eliminados: ${result.deletedCount}`);
    console.log("✅ Base de datos limpiada exitosamente");

    // Mostrar pedidos válidos restantes
    const validOrders = await Order.countDocuments();
    console.log(`\n📊 Pedidos válidos restantes: ${validOrders}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

cleanOrders();
