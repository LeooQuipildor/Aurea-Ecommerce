import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import axios from "axios";

const CheckoutPage = () => {
  const { cart, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    whatsapp: "",
    direccion: "",
    referencia: "",
    departamento: "",
    ciudad: "",
    email: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Estados para departamentos y municipios
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loadingDepartamentos, setLoadingDepartamentos] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  // Cargar departamentos al montar el componente
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(
          "https://api-colombia.com/api/v1/Department"
        );
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      } finally {
        setLoadingDepartamentos(false);
      }
    };

    fetchDepartamentos();
  }, []);

  // Cargar municipios cuando se selecciona un departamento
  useEffect(() => {
    const fetchMunicipios = async () => {
      if (!formData.departamento) {
        setMunicipios([]);
        return;
      }

      setLoadingMunicipios(true);
      try {
        // Buscar el ID del departamento seleccionado
        const departamentoSeleccionado = departamentos.find(
          (dep) =>
            dep.name.toLowerCase() === formData.departamento.toLowerCase()
        );

        if (departamentoSeleccionado) {
          const response = await axios.get(
            `https://api-colombia.com/api/v1/Department/${departamentoSeleccionado.id}/cities`
          );
          // La API devuelve un array directamente
          setMunicipios(response.data || []);
        }
      } catch (error) {
        console.error("Error al cargar municipios:", error);
        setMunicipios([]);
      } finally {
        setLoadingMunicipios(false);
      }
    };

    fetchMunicipios();
  }, [formData.departamento, departamentos]);

  // Calcular el precio total del carrito
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Verificar si el formulario está completo y válido
  const isFormComplete = () => {
    // Verificar que todos los campos tengan valor
    const allFieldsFilled =
      formData.nombre.trim() &&
      formData.apellido.trim() &&
      formData.whatsapp.trim() &&
      formData.email.trim() &&
      formData.direccion.trim() &&
      formData.referencia.trim() &&
      formData.departamento &&
      formData.ciudad;

    // Verificar que no haya errores
    const noErrors = Object.keys(errors).length === 0;

    // Verificar que los términos estén aceptados
    return allFieldsFilled && noErrors && acceptTerms;
  };

  // Función de validación
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (formData.nombre.trim().length > 25) {
      newErrors.nombre = "El nombre no puede exceder 25 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
    } else if (formData.apellido.trim().length > 25) {
      newErrors.apellido = "El apellido no puede exceder 25 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras";
    }

    // Validar WhatsApp (Colombia: empieza con 3, 10 dígitos)
    const phoneDigits = formData.whatsapp.replace(/\D/g, "");
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "El número de WhatsApp es obligatorio";
    } else if (phoneDigits.length !== 10) {
      newErrors.whatsapp = "El número debe tener exactamente 10 dígitos";
    } else if (!phoneDigits.startsWith("3")) {
      newErrors.whatsapp = "El número debe empezar con 3";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El email no es válido";
    } else if (formData.email.length > 50) {
      newErrors.email = "El email no puede exceder 50 caracteres";
    }

    // Validar dirección (debe incluir número)
    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria";
    } else if (formData.direccion.trim().length < 5) {
      newErrors.direccion = "La dirección debe tener al menos 5 caracteres";
    } else if (formData.direccion.length > 200) {
      newErrors.direccion = "La dirección no puede exceder 200 caracteres";
    } else if (!/\d/.test(formData.direccion)) {
      newErrors.direccion = "La dirección debe incluir un número";
    }

    // Validar referencia
    if (!formData.referencia.trim()) {
      newErrors.referencia = "El punto de referencia es obligatorio";
    } else if (formData.referencia.trim().length < 3) {
      newErrors.referencia = "Debe tener al menos 3 caracteres";
    } else if (formData.referencia.length > 300) {
      newErrors.referencia = "No puede exceder 300 caracteres";
    }

    // Validar departamento
    if (!formData.departamento) {
      newErrors.departamento = "Debes seleccionar un departamento";
    }

    // Validar ciudad
    if (!formData.ciudad) {
      newErrors.ciudad = "Debes seleccionar un municipio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Si cambia el departamento, resetear la ciudad
    if (name === "departamento") {
      setFormData({
        ...formData,
        departamento: value,
        ciudad: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      alert("Por favor, corrige los errores en el formulario");
      return;
    }

    if (!acceptTerms) {
      alert("Debes aceptar los términos para continuar");
      return;
    }

    setIsSubmitting(true);

    // Generar ID de pedido único
    const orderId = `AUR${Date.now().toString().slice(-8)}`;

    // Sanitizar datos (trim)
    const sanitizedData = {
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      whatsapp: formData.whatsapp.trim(),
      direccion: formData.direccion.trim(),
      referencia: formData.referencia.trim(),
      departamento: formData.departamento,
      ciudad: formData.ciudad,
      email: formData.email.trim().toLowerCase(),
    };

    // Preparar datos del pedido
    const orderData = {
      nombre: sanitizedData.nombre,
      apellido: sanitizedData.apellido,
      whatsapp: sanitizedData.whatsapp,
      email: sanitizedData.email,
      direccion: sanitizedData.direccion,
      referencia: sanitizedData.referencia,
      departamento: sanitizedData.departamento,
      ciudad: sanitizedData.ciudad,
      cart,
      totalPrice,
    };

    try {
      // Enviar pedido al backend
      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al procesar el pedido");
      }

      // Pedido exitoso
      console.log("✅ Pedido procesado:", data);

      // Limpiar carrito
      clearCart();
      setIsSubmitting(false);

      // Redirigir a página de confirmación
      navigate("/order-confirmation", {
        state: {
          orderData: {
            orderId: data.data.orderId,
            customerData: data.data.customerData,
            cart,
            totalPrice: data.data.totalPrice,
            date: data.data.createdAt,
          },
        },
      });
    } catch (error) {
      console.error("❌ Error al procesar pedido:", error);
      setIsSubmitting(false);
      alert(
        "Hubo un error al procesar tu pedido. Por favor, intenta nuevamente."
      );
    }
  };

  // Si el carrito está vacío, redirigir
  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-32">
          <h2 className="font-thin text-5xl md:text-6xl text-gray-900 mb-4">
            No hay productos en tu carrito
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-12 max-w-md">
            Agregá productos a tu carrito antes de realizar un pedido.
          </p>
          <Button onClick={() => navigate("/catalogo")}>Ir al Catálogo</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-24 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-thin text-6xl md:text-7xl text-gray-900 mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-gray-500 text-base">
            Completá tus datos para confirmar tu pedido
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FORMULARIO (Izquierda - 2 columnas) - Orden 2 en móvil/tablet, 1 en desktop */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-gray-50 border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Información de Entrega
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Completá todos los campos para recibir tu pedido
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre y Apellido en grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-stretch border border-gray-300 bg-white">
                        <div className="px-3 bg-gray-200 border-r border-gray-300 flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder="EJEMPLO: María"
                          minLength={2}
                          maxLength={25}
                          required
                          className={`flex-1 px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-400 ${
                            errors.nombre ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.nombre && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    {/* Apellido */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-stretch border border-gray-300 bg-white">
                        <div className="px-3 bg-gray-200 border-r border-gray-300 flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          placeholder="EJEMPLO: Rodriguez"
                          minLength={2}
                          maxLength={25}
                          required
                          className={`flex-1 px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-400 ${
                            errors.apellido ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.apellido && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.apellido}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Whatsapp <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-stretch border border-gray-300 bg-white">
                      <div className="px-3 bg-gray-200 border-r border-gray-300 flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </div>
                      <div className="px-3 bg-gray-100 border-r border-gray-300 flex items-center">
                        <span className="text-gray-700 font-medium">+57</span>
                      </div>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="3001234567"
                        pattern="3[0-9]{9}"
                        maxLength={10}
                        required
                        className={`flex-1 px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-400 ${
                          errors.whatsapp ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.whatsapp && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-stretch border border-gray-300 bg-white">
                      <div className="px-3 bg-gray-200 border-r border-gray-300 flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EJEMPLO: maria@gmail.com"
                        maxLength={50}
                        required
                        className={`flex-1 px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-400 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Dirección completa */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección completa <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-stretch border border-gray-300 bg-white">
                      <div className="px-3 bg-gray-200 border-r border-gray-300 flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Ej: Calle 19 # 29-80 Casa 8"
                        minLength={5}
                        maxLength={200}
                        required
                        className={`flex-1 px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-400 ${
                          errors.direccion ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.direccion && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.direccion}
                      </p>
                    )}
                  </div>

                  {/* Puntos de referencia */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntos de referencia{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-stretch border border-gray-300 bg-white">
                      <div className="px-3 bg-gray-200 border-r border-gray-300 flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="referencia"
                        value={formData.referencia}
                        onChange={handleChange}
                        placeholder="EJ: Barrio Palermo / Junto a panadería."
                        minLength={3}
                        maxLength={300}
                        required
                        className={`flex-1 px-4 py-3 focus:outline-none text-gray-900 placeholder-gray-400 ${
                          errors.referencia ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.referencia && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.referencia}
                      </p>
                    )}
                  </div>

                  {/* Departamento y Ciudad en grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Departamento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departamento <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="departamento"
                          value={formData.departamento}
                          onChange={handleChange}
                          required
                          disabled={loadingDepartamentos}
                          className={`w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none text-gray-900 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                            errors.departamento ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">
                            {loadingDepartamentos
                              ? "Cargando departamentos..."
                              : "Seleccionar departamento"}
                          </option>
                          {departamentos.map((dep) => (
                            <option key={dep.id} value={dep.name}>
                              {dep.name}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {errors.departamento && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.departamento}
                        </p>
                      )}
                    </div>

                    {/* Ciudad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Municipio <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleChange}
                          required
                          disabled={!formData.departamento || loadingMunicipios}
                          className={`w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none text-gray-900 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                            errors.ciudad ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">
                            {!formData.departamento
                              ? "Primero selecciona un departamento"
                              : loadingMunicipios
                              ? "Cargando municipios..."
                              : "Seleccionar municipio"}
                          </option>
                          {municipios.map((mun) => (
                            <option key={mun.id} value={mun.name}>
                              {mun.name}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {errors.ciudad && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.ciudad}
                        </p>
                      )}
                      {formData.departamento &&
                        municipios.length === 0 &&
                        !loadingMunicipios && (
                          <p className="text-xs text-gray-500 mt-1">
                            No se encontraron municipios para este departamento
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Checkbox de términos */}
                  <div className="flex items-start gap-3 pt-4 pb-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 border-gray-300"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      Me comprometo a pagar el monto total al momento de recibir
                      mi pedido en la dirección indicada.
                    </label>
                  </div>

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isFormComplete()}
                    fullWidth
                  >
                    {isSubmitting
                      ? "Procesando..."
                      : `Confirmar Pedido - $${totalPrice.toLocaleString()}`}
                  </Button>
                </form>
              </div>
            </div>

            {/* RESUMEN DEL PEDIDO (Derecha - 1 columna) - Orden 1 en móvil/tablet, 2 en desktop */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-gray-50 border border-gray-200 p-6 sticky top-24">
                <h2 className="font-semibold text-xl text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                {/* Lista de productos */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-3 pb-4 border-b border-gray-200 last:border-0"
                    >
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Método de envío */}
                <div className="mb-6 p-3 border border-gray-300 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-900 font-medium">
                        Envío gratis
                      </span>
                    </div>
                    <span className="text-sm text-green-600 font-semibold">
                      Gratis
                    </span>
                  </div>
                </div>

                {/* Totales */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} productos)</span>
                    <span className="text-gray-900 font-semibold">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-semibold">Gratis</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Información adicional */}
                <div className="bg-blue-50 border border-blue-200 p-4">
                  <div className="flex gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Pago contra entrega
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Pagarás en efectivo cuando recibas tu pedido en la
                        dirección indicada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
