import { useState } from "react";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import Button from "../components/Button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icono de mensaje */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>

          <h1 className="font-thin text-6xl md:text-7xl text-white mb-4">
            Ponete en Contacto
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            ¿Tenés alguna pregunta o necesitás ayuda? Completá el formulario y
            te responderemos a la brevedad.
          </p>

          {/* Información de contacto */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-gray-300">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm text-white">+57 321 842 2436</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-white">
                aurea.co.store@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm text-white">Colombia</span>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://www.instagram.com/aurea.only"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://wa.me/573218422436"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Formulario de Contacto */}
      <div className="py-1 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nombre"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Email y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tu mensaje"
                required
                rows="6"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 focus:outline-none focus:border-white/30 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Botón de envío */}
            <div>
              <Button type="submit" disabled={isSubmitting} fullWidth>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>

            {/* Mensaje de éxito */}
            {submitStatus === "success" && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 text-center">
                ¡Mensaje enviado con éxito! Te responderemos pronto.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Sección de Valores */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-thin text-5xl md:text-6xl text-white mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto">
              Creemos en la excelencia, la autenticidad y el compromiso con
              nuestros clientes
            </p>
          </div>

          {/* Grid de 3 imágenes con valores */}
          <div className="grid grid-cols-1 text-2xl md:grid-cols-3 gap-8 drop-shadow-[4px_4px_1px_rgba(0,0,0,0.15)]">
            {[
              {
                src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
                title: "Calidad",
                description:
                  "Seleccionamos cuidadosamente cada material para garantizar joyas que perduren en el tiempo con su brillo original.",
              },
              {
                src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800",
                title: "Conexión",
                description:
                  "Valoramos la relación con nuestros clientes y nos esforzamos por crear experiencias memorables en cada interacción.",
              },
              {
                src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
                title: "Autenticidad",
                description:
                  "Cada pieza es única y refleja nuestro compromiso con el diseño original y la artesanía genuina.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative h-[250px] md:h-[500px] overflow-hidden bg-black"
              >
                {/* Imagen de fondo con efecto zoom */}
                <img
                  src={item.src}
                  alt={`Auréa ${item.title}`}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Capa de ruido */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.40' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                  }}
                ></div>

                {/* Capa oscura */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>

                {/* Texto centrado */}
                <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
                  <div className="text-center">
                    <h3 className="text-white text-xl md:text-2xl font-medium tracking-wider uppercase drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
                      {item.title}
                    </h3>
                    {/* Descripción que aparece al hacer hover */}
                    <p className="text-white text-base md:text-lg text-center leading-relaxed mt-4 hidden group-hover:block transition-opacity duration-500 max-w-xs mx-auto px-6 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
