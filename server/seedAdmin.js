const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const createAdminUser = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: 'admin@aurea.com' });

    if (existingAdmin) {
      console.log('⚠️  El usuario administrador ya existe');
      console.log('Email:', existingAdmin.email);
      console.log('Nombre:', existingAdmin.name);
      process.exit(0);
    }

    // Hashear la contraseña manualmente
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('Password hasheada correctamente');

    // Crear usuario administrador con contraseña ya hasheada
    const admin = new User({
      email: 'admin@aurea.com',
      password: hashedPassword,
      name: 'Administrador Aurea',
      role: 'admin'
    });

    // Guardar sin trigger del middleware (la contraseña ya está hasheada)
    await admin.save({ validateBeforeSave: true });

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Nombre:', admin.name);
    console.log('🛡️  Rol:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🚀 Ahora puedes iniciar sesión en: http://localhost:5173/admin/login');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error.message);
    console.error(error);
    process.exit(1);
  }
};

createAdminUser();
