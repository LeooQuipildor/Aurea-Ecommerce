/**
 * Script para verificar el login del admin
 * Ejecutar con: node testLogin.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const testLogin = async () => {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB\n");

    // Buscar el usuario
    const user = await User.findOne({ email: "leoooquipildor@gmail.com" }).select('+password');

    if (!user) {
      console.log("❌ No se encontró el usuario con email: leoooquipildor@gmail.com");
      console.log("\n📝 Ejecuta: node createAdmin.js para crear el usuario");
      process.exit(1);
    }

    console.log("✅ Usuario encontrado:");
    console.log("📧 Email:", user.email);
    console.log("👤 Nombre:", user.name);
    console.log("🔑 Role:", user.role);
    console.log("✅ Activo:", user.isActive);
    console.log("");

    // Probar la contraseña
    const testPassword = "ikmarjrpkvwlcvrl";
    const isMatch = await user.comparePassword(testPassword);

    if (isMatch) {
      console.log("✅ ¡Contraseña correcta!");
      console.log("\n🎉 Puedes iniciar sesión con:");
      console.log("📧 Email: leoooquipildor@gmail.com");
      console.log("🔐 Contraseña: ikmarjrpkvwlcvrl");
    } else {
      console.log("❌ Contraseña incorrecta");
      console.log("\n🔧 Actualizando contraseña...");
      
      user.password = testPassword;
      await user.save();
      
      console.log("✅ Contraseña actualizada exitosamente");
      console.log("\n🎉 Ahora puedes iniciar sesión con:");
      console.log("📧 Email: leoooquipildor@gmail.com");
      console.log("🔐 Contraseña: ikmarjrpkvwlcvrl");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

testLogin();
