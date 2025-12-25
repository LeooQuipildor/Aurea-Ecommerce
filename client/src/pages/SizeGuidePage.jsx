import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const SizeGuidePage = () => {
  return (
    <div className="bg-white">
      {/* SEO */}
      <SEO
        title="Guía de Tallas - AURÉA Joyería Colombia"
        description="Encuentra tu talla perfecta con nuestra guía completa de tallas para anillos, pulseras y collares. Aprende cómo medir correctamente y consejos útiles."
        keywords="guía de tallas anillos, cómo medir talla anillo, talla pulsera, medidas joyería, tabla tallas colombia"
      />

      {/* Hero */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-thin text-gray-900 mb-4"
          >
            Guía de Tallas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Encuentra tu talla perfecta con nuestra guía completa
          </motion.p>
        </div>
      </section>

      {/* Guía de Anillos */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-thin text-gray-900 mb-8">
            Tallas de Anillos
          </h2>

          {/* Cómo Medir */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Cómo Medir tu Talla de Anillo?
            </h3>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">
                  Método 1: Con un Anillo que Ya Tienes
                </h4>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Toma un anillo que te quede bien en el dedo deseado</li>
                  <li>Mide el diámetro interno del anillo en milímetros</li>
                  <li>Busca esa medida en la tabla de abajo</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Método 2: Con un Hilo o Papel
                </h4>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Corta una tira de papel o usa un hilo</li>
                  <li>Envuélvelo alrededor del dedo donde usarás el anillo</li>
                  <li>Marca donde se junta el papel/hilo</li>
                  <li>Mide la longitud en milímetros</li>
                  <li>Divide esa medida entre 3.14 para obtener el diámetro</li>
                  <li>Busca el diámetro en la tabla</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Tabla de Tallas */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-black text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Talla Colombia
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Talla USA
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Diámetro (mm)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Circunferencia (mm)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">10</td>
                  <td className="border border-gray-300 px-4 py-3">5</td>
                  <td className="border border-gray-300 px-4 py-3">15.7</td>
                  <td className="border border-gray-300 px-4 py-3">49.3</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">12</td>
                  <td className="border border-gray-300 px-4 py-3">6</td>
                  <td className="border border-gray-300 px-4 py-3">16.5</td>
                  <td className="border border-gray-300 px-4 py-3">51.9</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">14</td>
                  <td className="border border-gray-300 px-4 py-3">7</td>
                  <td className="border border-gray-300 px-4 py-3">17.3</td>
                  <td className="border border-gray-300 px-4 py-3">54.4</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">16</td>
                  <td className="border border-gray-300 px-4 py-3">8</td>
                  <td className="border border-gray-300 px-4 py-3">18.2</td>
                  <td className="border border-gray-300 px-4 py-3">57.0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">18</td>
                  <td className="border border-gray-300 px-4 py-3">9</td>
                  <td className="border border-gray-300 px-4 py-3">19.0</td>
                  <td className="border border-gray-300 px-4 py-3">59.5</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">20</td>
                  <td className="border border-gray-300 px-4 py-3">10</td>
                  <td className="border border-gray-300 px-4 py-3">19.8</td>
                  <td className="border border-gray-300 px-4 py-3">62.1</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">22</td>
                  <td className="border border-gray-300 px-4 py-3">11</td>
                  <td className="border border-gray-300 px-4 py-3">20.6</td>
                  <td className="border border-gray-300 px-4 py-3">64.6</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Consejos */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              💡 Consejos Importantes:
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Mide tu dedo al final del día cuando está más hinchado</li>
              <li>
                • La temperatura afecta el tamaño del dedo (más grande en calor)
              </li>
              <li>• Los dedos de la mano dominante suelen ser más grandes</li>
              <li>• Si estás entre dos tallas, elige la más grande</li>
              <li>
                • Los anillos anchos necesitan media talla más que los delgados
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Guía de Pulseras */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-thin text-gray-900 mb-8">
              Tallas de Pulseras
            </h2>

            <div className="bg-white p-6 md:p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                ¿Cómo Medir tu Muñeca?
              </h3>

              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li>Usa una cinta métrica flexible o un hilo</li>
                <li>
                  Envuélvelo alrededor de tu muñeca, justo debajo del hueso
                </li>
                <li>Ajusta cómodamente (ni muy apretado ni muy suelto)</li>
                <li>Anota la medida en centímetros</li>
                <li>Agrega 1-2 cm para comodidad</li>
              </ol>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left">
                        Talla
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left">
                        Circunferencia Muñeca
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left">
                        Largo Pulsera
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">XS</td>
                      <td className="border border-gray-300 px-4 py-3">
                        14-15 cm
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        16-17 cm
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">S</td>
                      <td className="border border-gray-300 px-4 py-3">
                        15-16 cm
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        17-18 cm
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">M</td>
                      <td className="border border-gray-300 px-4 py-3">
                        16-17 cm
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        18-19 cm
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">L</td>
                      <td className="border border-gray-300 px-4 py-3">
                        17-18 cm
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        19-20 cm
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">XL</td>
                      <td className="border border-gray-300 px-4 py-3">
                        18-19 cm
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        20-21 cm
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guía de Collares */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-thin text-gray-900 mb-8">
            Largos de Collares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Gargantilla
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>35-40 cm</strong>
              </p>
              <p className="text-gray-700">
                Se ajusta al cuello. Ideal para cuellos largos y escotes
                pronunciados.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Princesa
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>45-50 cm</strong>
              </p>
              <p className="text-gray-700">
                Cae justo debajo de la clavícula. El largo más versátil y
                popular.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Matinée
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>55-60 cm</strong>
              </p>
              <p className="text-gray-700">
                Cae sobre el pecho. Perfecto para looks casuales y elegantes.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ópera
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>70-90 cm</strong>
              </p>
              <p className="text-gray-700">
                Largo y elegante. Puede usarse simple o doble. Ideal para
                ocasiones formales.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Ayuda Adicional */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-thin mb-6">
              ¿Necesitas Ayuda?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Nuestro equipo está disponible para ayudarte a encontrar la talla
              perfecta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="inline-block px-8 py-4 bg-white text-black font-semibold uppercase tracking-widest text-sm hover:bg-gray-200 transition duration-300"
              >
                Contáctanos
              </Link>
              <Link
                to="/catalogo"
                className="inline-block px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition duration-300"
              >
                Ver Catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SizeGuidePage;
