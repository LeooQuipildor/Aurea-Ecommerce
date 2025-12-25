import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* SEO */}
      <SEO
        title="Sobre Nosotros - AURÉA Joyería de Lujo Colombia"
        description="Conoce la historia de AURÉA, joyería de lujo en Colombia. Descubre nuestros valores, proceso artesanal y compromiso con la calidad en cada pieza única."
        keywords="sobre auréa, joyería colombia, historia marca, valores joyería, artesanía colombia"
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        ></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-thin text-white mb-4 tracking-widest">
              SOBRE AURÉA
            </h1>
            <p className="text-lg md:text-xl text-white font-light tracking-wider">
              Joyería de Lujo Hecha en Colombia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-8 text-center">
            Nuestra Historia
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>AURÉA</strong> nace de la pasión por crear joyas únicas
              que cuentan historias. Cada pieza que diseñamos es el resultado de
              un cuidadoso proceso artesanal que combina tradición colombiana
              con técnicas modernas de manufactura, garantizando piezas de la
              más alta calidad que resistirán el paso del tiempo.
            </p>

            <p>
              En AURÉA creemos que la joyería es más que un simple accesorio. Es
              una forma de expresión personal, un símbolo de momentos
              importantes y un legado que se transmite de generación en
              generación. Por eso, cada collar, anillo, pulsera y arete que sale
              de nuestro taller es elaborado con dedicación y atención al
              detalle.
            </p>

            <p>
              Nuestra colección incluye <strong>collares elegantes</strong>,{" "}
              <strong>anillos únicos</strong>,
              <strong>pulseras sofisticadas</strong> y{" "}
              <strong>aretes exclusivos</strong>. Trabajamos exclusivamente con
              materiales de primera calidad: oro de 18k, plata 925 y piedras
              preciosas auténticas, seleccionadas cuidadosamente para cada
              diseño.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Nuestros Valores */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-thin text-gray-900 mb-12 text-center"
          >
            Nuestros Valores
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Calidad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-4 text-5xl">💎</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Calidad
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos únicamente materiales de primera calidad y técnicas
                artesanales que garantizan la durabilidad y belleza de cada
                pieza.
              </p>
            </motion.div>

            {/* Autenticidad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4 text-5xl">✨</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Autenticidad
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cada joya es única y auténtica, diseñada para reflejar la
                personalidad y estilo individual de quien la lleva.
              </p>
            </motion.div>

            {/* Compromiso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-4 text-5xl">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Compromiso
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nos comprometemos con la satisfacción total de nuestros
                clientes, ofreciendo garantía de por vida y envío gratis en toda
                Colombia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proceso Artesanal */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-8 text-center">
            Nuestro Proceso
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Cada joya AURÉA pasa por un riguroso proceso de creación que
              combina artesanía tradicional con innovación moderna:
            </p>

            <div className="space-y-4 pl-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Diseño</h3>
                <p>
                  Nuestros diseñadores crean bocetos únicos inspirados en la
                  elegancia atemporal y las tendencias contemporáneas.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  2. Selección de Materiales
                </h3>
                <p>
                  Elegimos cuidadosamente cada material: oro de 18k, plata 925 y
                  piedras preciosas auténticas de la más alta calidad.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  3. Elaboración Artesanal
                </h3>
                <p>
                  Artesanos expertos trabajan cada pieza con técnicas
                  tradicionales, asegurando atención al detalle en cada paso.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  4. Control de Calidad
                </h3>
                <p>
                  Cada joya pasa por un estricto control de calidad antes de
                  llegar a tus manos, garantizando perfección en cada detalle.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Por Qué Elegir AURÉA */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-thin mb-12 text-center"
          >
            ¿Por Qué Elegir AURÉA?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <span className="text-3xl">🚚</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
                <p className="text-gray-300">
                  Envío gratuito a toda Colombia con seguimiento en tiempo real.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <span className="text-3xl">🛡️</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Garantía de Por Vida
                </h3>
                <p className="text-gray-300">
                  Todas nuestras joyas incluyen garantía contra defectos de
                  fabricación.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="text-3xl">💳</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">Pago Seguro</h3>
                <p className="text-gray-300">
                  Procesamiento seguro de pagos con las mejores plataformas.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="text-3xl">💬</span>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Atención Personalizada
                </h3>
                <p className="text-gray-300">
                  Nuestro equipo está siempre disponible para ayudarte a elegir
                  la joya perfecta.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-thin text-gray-900 mb-6">
            Descubre la Magia de AURÉA
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explora nuestra colección de joyas únicas y encuentra la pieza
            perfecta que refleje tu estilo y personalidad.
          </p>
          <Link
            to="/catalogo"
            className="inline-block px-8 py-4 bg-black text-white font-semibold uppercase tracking-widest text-sm hover:bg-gray-800 transition duration-300"
          >
            Ver Colección Completa
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
