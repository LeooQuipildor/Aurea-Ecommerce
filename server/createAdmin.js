/**
 * Script para crear usuario administrador
 * Ejecutar con: node createAdmin.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error("No se encontró MONGODB_URI o MONGO_URI en las variables de entorno");
    }
    
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB");

    // Verificar si ya existe un admin con este email
    const existingAdmin = await User.findOne({
      email: "leoooquipildor@gmail.com",
    });

    if (existingAdmin) {
      console.log("⚠️  Ya existe un administrador con este email");
      console.log("Actualizando contraseña...");

      existingAdmin.password = "ikmarjrpkvwlcvrl";
      existingAdmin.name = "Leo Quipildor";
      existingAdmin.role = "admin";
      existingAdmin.isActive = true;
      await existingAdmin.save();

      console.log("✅ Administrador actualizado exitosamente");
    } else {
      // Crear nuevo admin
      const admin = await User.create({
        email: "leoooquipildor@gmail.com",
        password: "ikmarjrpkvwlcvrl",
        name: "Leo Quipildor",
        role: "admin",
        isActive: true,
      });

      console.log("✅ Administrador creado exitosamente");
      console.log("📧 Email:", admin.email);
      console.log("👤 Nombre:", admin.name);
      console.log("🔑 Role:", admin.role);
    }

    console.log("\n🎉 ¡Listo! Ahora puedes iniciar sesión con:");
    console.log("📧 Email: leoooquipildor@gmail.com");
    console.log("🔐 Contraseña: ikmarjrpkvwlcvrl");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
