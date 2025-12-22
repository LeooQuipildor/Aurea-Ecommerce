const bcrypt = require('bcryptjs');

// Este es el hash que está en MongoDB Atlas
const hashInDB = '$2b$10$Kxfm6NfbnzpSvXu3BCTZcu9xWeNWa3zTVyZZdKfLfxJlwgM/QAVDO';

// Contraseñas a probar
const passwords = [
  'Aurea2024!',
  'Admin2024!',
  'ikmarjrpkvwlcvrl',
  'aurea2024!',
  'AUREA2024!',
  'admin123',
  '1talento',
  'Aurea123!',
  'Admin123!'
];

async function testPasswords() {
  console.log('🔐 Probando contraseñas contra el hash en la base de datos...\n');
  console.log('Hash en DB:', hashInDB.substring(0, 30) + '...\n');
  
  for (const pwd of passwords) {
    const isValid = await bcrypt.compare(pwd, hashInDB);
    console.log(`${isValid ? '✅ CORRECTA' : '❌'} "${pwd}"`);
    
    if (isValid) {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 ¡ENCONTRADA!');
      console.log('La contraseña correcta es:', pwd);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      break;
    }
  }
}

testPasswords();
