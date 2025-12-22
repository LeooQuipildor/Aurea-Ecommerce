// Script para RESETEAR la contraseña del admin
// Ejecutar: node resetAdminPassword.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aurea';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function resetPassword() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    const email = 'leoooquipildor@gmail.com';
    const newPassword = 'Admin2024!'; // Nueva contraseña más segura

    // Buscar el usuario
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ Usuario no encontrado.');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('👤 Usuario encontrado:', user.email);
    console.log('🔐 Rol actual:', user.role);

    // Hashear la nueva contraseña
    console.log('🔐 Hasheando nueva contraseña...');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña
    user.password = hashedPassword;
    await user.save();

    console.log('\n🎉 ¡Contraseña actualizada exitosamente!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Nueva Contraseña:', newPassword);
    console.log('👤 Rol:', user.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🌐 Accede al panel admin en: https://aurea-joyeria.vercel.app/admin/login');
    
    await mongoose.connection.close();
    console.log('\n👋 Conexión cerrada.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

resetPassword();
