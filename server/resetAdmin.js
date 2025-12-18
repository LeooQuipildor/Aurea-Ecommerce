/**
 * Script para resetear el usuario admin
 * Ejecutar con: node resetAdmin.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetAdmin = async () => {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB\n");

    // Definir el schema directamente
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      role: String,
      isActive: Boolean,
    }, { timestamps: true });

    const User = mongoose.model('User', userSchema);

    // Eliminar usuario existente
    await User.deleteOne({ email: "leoooquipildor@gmail.com" });
    console.log("🗑️  Usuario anterior eliminado\n");

    // Hashear la contraseña manualmente
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("ikmarjrpkvwlcvrl", salt);

    // Crear nuevo usuario con contraseña ya hasheada
    const admin = await User.create({
      email: "leoooquipildor@gmail.com",
      password: hashedPassword,
      name: "Leo Quipildor",
      role: "admin",
      isActive: true,
    });

    console.log("✅ Nuevo administrador creado:");
    console.log("📧 Email:", admin.email);
    console.log("👤 Nombre:", admin.name);
    console.log("🔑 Role:", admin.role);

    // Verificar que la contraseña funciona
    const isMatch = await bcrypt.compare("ikmarjrpkvwlcvrl", admin.password);
    
    if (isMatch) {
      console.log("\n✅ ¡Contraseña verificada correctamente!");
      console.log("\n🎉 Ahora puedes iniciar sesión con:");
      console.log("📧 Email: leoooquipildor@gmail.com");
      console.log("🔐 Contraseña: ikmarjrpkvwlcvrl");
    } else {
      console.log("\n❌ Error en la verificación de contraseña");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

resetAdmin();
