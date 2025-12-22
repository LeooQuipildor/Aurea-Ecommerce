// Script para verificar y sincronizar el usuario admin en MongoDB Atlas
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function syncAdmin() {
  try {
    console.log('🔄 Conectando a MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a:', mongoose.connection.db.databaseName);

    const email = 'admin@aurea.com';
    const password = 'Aurea2024!';

    // Buscar en la colección users directamente
    const usersCollection = mongoose.connection.db.collection('users');
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      console.log('❌ Usuario NO encontrado en la base de datos');
      console.log('\n📋 Creando usuario admin...');
      
      // Hash de la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      await usersCollection.insertOne({
        name: 'Admin AURÉA',
        email: email,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('✅ Usuario creado exitosamente');
    } else {
      console.log('✅ Usuario encontrado:', email);
      console.log('📋 Datos:', {
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        hasPassword: !!user.password
      });

      // Verificar la contraseña
      console.log('\n🔐 Verificando contraseña...');
      const isValid = await bcrypt.compare(password, user.password);
      console.log('Resultado:', isValid ? '✅ CORRECTA' : '❌ INCORRECTA');

      if (!isValid) {
        console.log('\n🔧 Actualizando contraseña...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await usersCollection.updateOne(
          { email: email },
          { 
            $set: { 
              password: hashedPassword,
              isActive: true,
              updatedAt: new Date()
            } 
          }
        );
        
        console.log('✅ Contraseña actualizada');
        
        // Verificar de nuevo
        const updatedUser = await usersCollection.findOne({ email: email });
        const isValidNow = await bcrypt.compare(password, updatedUser.password);
        console.log('✅ Verificación:', isValidNow ? 'CORRECTA' : 'ERROR');
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ TODO LISTO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@aurea.com');
    console.log('🔑 Password: Aurea2024!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await mongoose.connection.close();
    console.log('\n👋 Desconectado');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    await mongoose.connection.close();
    process.exit(1);
  }
}

syncAdmin();
