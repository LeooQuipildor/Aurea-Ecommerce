// Script para crear usuario administrador (FORZAR RECREACIÓN)
// Ejecutar: node createAdmin.js

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

async function createAdmin() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');

    // Datos del admin
    const adminData = {
      name: 'Admin AURÉA',
      email: 'leoooquipildor@gmail.com',
      password: 'ikmarjrpkvwlcvrl',
      role: 'admin'
    };

    // ELIMINAR usuario existente si existe
    const existingUser = await User.findOne({ email: adminData.email });
    
    if (existingUser) {
      console.log('⚠️  Usuario existente encontrado. Eliminando...');
      await User.deleteOne({ email: adminData.email });
      console.log('✅ Usuario anterior eliminado.');
    }

    // Hashear la contraseña
    console.log('🔐 Hasheando contraseña...');
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Crear el usuario admin
    const admin = new User({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    console.log('\n🎉 ¡Usuario administrador creado exitosamente!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Contraseña:', adminData.password);
    console.log('👤 Rol:', admin.role);
    console.log('🆔 ID:', admin._id);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANTE: Guarda estas credenciales.');
    console.log('🌐 Accede al panel admin en: https://tu-sitio.vercel.app/admin/login');
    
    await mongoose.connection.close();
    console.log('\n👋 Conexión cerrada.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();
