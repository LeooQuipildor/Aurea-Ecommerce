// Script para VERIFICAR el usuario admin
// Ejecutar: node checkAdmin.js

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

async function checkAdmin() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas\n');

    const email = 'leoooquipildor@gmail.com';
    const testPassword = 'Admin2024!';

    // Buscar el usuario
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ Usuario NO encontrado en la base de datos.');
      console.log('📧 Email buscado:', email);
      
      // Listar todos los usuarios
      const allUsers = await User.find({});
      console.log('\n📋 Usuarios en la base de datos:', allUsers.length);
      allUsers.forEach(u => {
        console.log(`  - ${u.email} (${u.role})`);
      });
      
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ Usuario encontrado:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', user.email);
    console.log('👤 Nombre:', user.name);
    console.log('🔐 Rol:', user.role);
    console.log('🆔 ID:', user._id);
    console.log('📅 Creado:', user.createdAt);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verificar la contraseña
    console.log('🔐 Verificando contraseña...');
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    
    if (isPasswordValid) {
      console.log('✅ La contraseña es CORRECTA');
      console.log('🔑 Contraseña a usar:', testPassword);
    } else {
      console.log('❌ La contraseña NO coincide');
      console.log('⚠️  Necesitas resetear la contraseña');
    }
    
    await mongoose.connection.close();
    console.log('\n👋 Conexión cerrada.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

checkAdmin();
