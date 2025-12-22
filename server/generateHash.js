const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'Aurea2024!';
  const hash = await bcrypt.hash(password, 10);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nCopia este hash y reemplázalo en MongoDB Atlas:');
  console.log(hash);
}

generateHash();
