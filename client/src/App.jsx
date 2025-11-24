function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar de prueba */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Mi E-commerce</h1>
        <ul className="flex gap-4">
          <li className="hover:text-blue-500 cursor-pointer">Inicio</li>
          <li className="hover:text-blue-500 cursor-pointer">Productos</li>
          <li className="hover:text-blue-500 cursor-pointer">Carrito (0)</li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a la tienda</h2>
        <p className="text-gray-600">Aquí irán tus productos destacados.</p>
        
        {/* Botón de prueba Tailwind */}
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Ver Ofertas
        </button>
      </main>
    </div>
  )
}

export default App