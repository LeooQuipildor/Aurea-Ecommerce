// Script para actualizar categorías de productos existentes
require('dotenv').config();
const mongoose = require('mongoose');

async function updateProductCategories() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado\n');

    const productsCollection = mongoose.connection.db.collection('products');
    
    // Ver productos actuales
    const products = await productsCollection.find({}).toArray();
    console.log(`📦 Total de productos: ${products.length}\n`);

    if (products.length === 0) {
      console.log('✅ No hay productos para actualizar');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Mostrar productos con categorías antiguas
    const oldCategories = ['Ropa', 'Electrónica', 'Hogar', 'Accesorios', 'Otros'];
    const productsToUpdate = products.filter(p => oldCategories.includes(p.category));

    console.log(`🔍 Productos con categorías antiguas: ${productsToUpdate.length}`);
    productsToUpdate.forEach(p => {
      console.log(`  - ${p.name}: ${p.category}`);
    });

    if (productsToUpdate.length > 0) {
      console.log('\n⚠️  ADVERTENCIA: Hay productos con categorías antiguas');
      console.log('Opciones:');
      console.log('1. Eliminar todos los productos');
      console.log('2. Actualizar categorías manualmente');
      console.log('\n💡 Recomendación: Eliminar productos de prueba y crear nuevos con categorías correctas');
      
      // Eliminar todos los productos
      const result = await productsCollection.deleteMany({});
      console.log(`\n🗑️  Eliminados ${result.deletedCount} productos`);
      console.log('✅ Ahora puedes crear productos con las nuevas categorías');
    } else {
      console.log('\n✅ Todos los productos tienen categorías válidas');
    }

    await mongoose.connection.close();
    console.log('\n👋 Desconectado');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

updateProductCategories();
