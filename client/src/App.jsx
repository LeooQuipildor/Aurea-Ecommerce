import { useEffect, useState } from 'react'; // Hooks para estado y efectos
import axios from 'axios'; // Para conectar con el backend

function App() {
  // 1. Estado para guardar los productos que traigamos de la DB
  const [products, setProducts] = useState([]);
  
  // 2. Estado para manejar errores (si el server falla)
  const [error, setError] = useState(null);

  // 3. useEffect: Se ejecuta una sola vez cuando carga la página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Hacemos la petición a TU servidor (asegúrate que el puerto 5000 esté corriendo)
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data); // Guardamos los datos en el estado
      } catch (err) {
        console.error("Error al conectar:", err);
        setError('Error al conectar con el servidor. ¿Está encendido?');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Catálogo Aurea
      </h1>

      {/* Si hay error, lo mostramos en rojo */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            {/* Imagen del producto */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            
            {/* Datos del producto */}
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 text-sm mb-2">{product.category}</p>
            <p className="text-gray-600 line-clamp-2">{product.description}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">${product.price}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Añadir
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;