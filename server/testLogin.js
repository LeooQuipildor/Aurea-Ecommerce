const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const user = await User.findOne({ email: 'admin@aurea.com' }).select('+password');
    
    if (!user) {
      console.log('❌ Usuario no encontrado');
      process.exit(1);
    }

    console.log('Usuario encontrado:');
    console.log('Email:', user.email);
    console.log('Nombre:', user.name);
    console.log('Rol:', user.role);
    console.log('Password hash completo:', user.password);
    console.log('Longitud del hash:', user.password.length);

    // Probar la comparación de contraseña
    const testPassword = 'admin123';
    console.log('\nProbando contraseña:', testPassword);
    
    // Probar con el método del modelo
    const isValid = await user.comparePassword(testPassword);
    console.log('¿Contraseña válida (método del modelo)?:', isValid);

    // Probar directamente con bcrypt
    const isValidDirect = await bcrypt.compare(testPassword, user.password);
    console.log('¿Contraseña válida (bcrypt directo)?:', isValidDirect);

    if (isValid) {
      console.log('✅ ¡La contraseña es correcta!');
    } else {
      console.log('❌ La contraseña es incorrecta');
      
      // Intentar crear un nuevo hash para comparar
      console.log('\nCreando nuevo hash para comparar...');
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log('Nuevo hash:', newHash);
      const testNewHash = await bcrypt.compare(testPassword, newHash);
      console.log('¿El nuevo hash funciona?:', testNewHash);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

testLogin();
