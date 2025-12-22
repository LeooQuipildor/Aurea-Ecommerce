// Script para ACTIVAR el usuario admin
// Ejecutar: node activateAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aurea';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function activateAdmin() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas\n');

    const email = 'leoooquipildor@gmail.com';

    // Buscar y actualizar el usuario
    const user = await User.findOneAndUpdate(
      { email },
      { isActive: true },
      { new: true }
    );
    
    if (!user) {
      console.log('❌ Usuario no encontrado.');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ Usuario activado exitosamente:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', user.email);
    console.log('👤 Nombre:', user.name);
    console.log('🔐 Rol:', user.role);
    console.log('✅ isActive:', user.isActive);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 ¡Ahora puedes iniciar sesión!');
    console.log('🌐 URL: https://aurea-joyeria.vercel.app/admin/login');
    console.log('📧 Email: leoooquipildor@gmail.com');
    console.log('🔑 Password: Admin2024!');
    
    await mongoose.connection.close();
    console.log('\n👋 Conexión cerrada.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

activateAdmin();
