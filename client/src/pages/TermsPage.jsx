import Footer from "../components/Footer";

const TermsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-thin text-4xl md:text-6xl lg:text-7xl text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Términos y Condiciones de Uso de AURÉA
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Sección 1 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              1. ACEPTACIÓN DE LOS TÉRMINOS
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Bienvenido a AURÉA. Al acceder, navegar o utilizar este sitio web
              ("Sitio") y/o realizar una compra, usted ("el Cliente" o "el
              Usuario") acepta estar sujeto a los siguientes Términos y
              Condiciones ("Términos"). Estos Términos constituyen un contrato
              legalmente vinculante entre usted y AURÉA. Si no está de acuerdo
              con alguna parte de estos Términos, debe abstenerse de utilizar
              nuestros servicios.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              2. IDENTIDAD DE LA MARCA Y PRODUCTOS
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              AURÉA se especializa en joyería y moda de estilo "Lujo
              Minimalista" con influencias urbanas.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Naturaleza de los productos:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Muchos de nuestros artículos de joyería pueden incluir
                  acabados manuales o piedras naturales. Por consiguiente,
                  pueden existir ligeras variaciones en color, textura o tamaño
                  entre la imagen mostrada en el Sitio y el producto físico.
                  Estas variaciones no se consideran defectos, sino
                  características inherentes a la exclusividad del producto.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Disponibilidad:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Todos los pedidos están sujetos a disponibilidad. En el caso
                  excepcional de que un artículo pedido no se encuentre en
                  stock, nos reservamos el derecho de cancelar el pedido y
                  reembolsar el importe total pagado por el Cliente.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 3 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              3. PROPIEDAD INTELECTUAL
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Todo el contenido alojado o puesto a disposición en este Sitio,
              incluyendo pero no limitado a textos, gráficos, logotipos, iconos
              de botones, imágenes, clips de audio, descargas digitales,
              compilaciones de datos y software, es propiedad exclusiva de AURÉA
              o de sus proveedores de contenido y está protegido por las leyes
              de propiedad intelectual nacionales e internacionales.
            </p>
            <ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  Queda estrictamente prohibido el uso de nuestra marca,
                  estética visual o "look & feel" sin consentimiento expreso por
                  escrito.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span>
                  El usuario no puede utilizar técnicas de "framing" para
                  ocultar marcas registradas o logotipos de AURÉA.
                </span>
              </li>
            </ul>
          </section>

          {/* Sección 4 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              4. PRECIOS Y PAGOS
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Moneda:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Los precios se muestran en la moneda local configurada en el
                  sitio e incluyen los impuestos aplicables según la legislación
                  vigente, salvo que se indique lo contrario.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Cambios de Precio:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  AURÉA se reserva el derecho de modificar los precios en
                  cualquier momento sin previo aviso. Sin embargo, el precio
                  aplicable a una orden será el que figure en el momento en que
                  el Cliente valide su compra.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Seguridad:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Las transacciones se realizan a través de pasarelas de pago
                  seguras y encriptadas. AURÉA no almacena datos sensibles de
                  tarjetas de crédito o débito en sus servidores propios.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 5 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              5. ENVÍOS Y ENTREGAS
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Procesamiento:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Los pedidos se procesan de lunes a viernes. Los tiempos de
                  preparación pueden variar durante lanzamientos de nuevas
                  colecciones o temporadas altas.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Responsabilidad:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  La propiedad y el riesgo de pérdida de los productos se
                  transfieren al Cliente en el momento de la entrega al
                  transportista. AURÉA no se hace responsable por retrasos
                  debidos a trámites aduaneros, huelgas de transporte o causas
                  de fuerza mayor.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Direcciones erróneas:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Es responsabilidad del Cliente proporcionar una dirección de
                  envío completa y correcta. AURÉA no asumirá costos de reenvío
                  por direcciones ingresadas incorrectamente.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 6 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              6. POLÍTICA DE CAMBIOS Y DEVOLUCIONES
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Nuestra prioridad es la satisfacción del cliente y la calidad de
              nuestras piezas.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Plazo:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  El Cliente dispone de un plazo de 15 días naturales desde la
                  recepción del pedido para solicitar un cambio o devolución.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Condiciones:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  El producto debe estar en perfectas condiciones, sin usar, y
                  en su embalaje original (caja, bolsa protectora y etiquetas).
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Excepciones:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Por razones de higiene y seguridad, no se aceptan cambios ni
                  devoluciones en aretes (pendientes), salvo defecto de fábrica
                  comprobable. Tampoco se aceptan devoluciones en artículos
                  personalizados o marcados como "Venta Final".
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                  Proceso:
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Para iniciar una devolución, el Cliente debe contactar a
                  nuestro servicio de atención al cliente. Los gastos de envío
                  de la devolución correrán por cuenta del Cliente, salvo en
                  casos de producto defectuoso.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 7 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              7. GARANTÍA DE CALIDAD
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              AURÉA ofrece una garantía limitada de 30 días sobre defectos de
              fabricación en sus piezas de joyería (broches rotos, caída de
              piedras por mal engaste). Esta garantía no cubre daños causados
              por uso indebido, accidentes, desgaste natural, contacto con
              productos químicos (perfumes, cremas, cloro) o modificaciones
              realizadas por terceros.
            </p>
          </section>

          {/* Sección 8 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              8. PRIVACIDAD Y DATOS PERSONALES
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              AURÉA se compromete a proteger la privacidad del Cliente. La
              información recopilada se utiliza exclusivamente para procesar
              pedidos, mejorar la experiencia de navegación y, si el Cliente lo
              autoriza, enviar comunicaciones comerciales (Newsletter). Nunca
              vendemos ni alquilamos datos personales a terceros.
            </p>
          </section>

          {/* Sección 9 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              9. LIMITACIÓN DE RESPONSABILIDAD
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              AURÉA no será responsable por daños indirectos, incidentales,
              punitivos o consecuentes que surjan del uso o la imposibilidad de
              uso del Sitio o de los productos adquiridos. La responsabilidad
              máxima de AURÉA hacia el Cliente se limitará al monto pagado por
              el producto en cuestión.
            </p>
          </section>

          {/* Sección 10 */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              10. LEY APLICABLE Y JURISDICCIÓN
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              del país donde opera la sede principal de AURÉA. Cualquier disputa
              que surja en relación con estos Términos estará sujeta a la
              jurisdicción exclusiva de los tribunales competentes de dicha
              localidad.
            </p>
          </section>

          {/* Sección 11 - Contacto */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
              11. CONTACTO
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Para cualquier consulta legal o relacionada con estos términos,
              por favor contáctenos en:
            </p>
            <div className="bg-gray-50 border border-gray-200 p-6 md:p-8">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:aurea.co.store@gmail.com"
                      className="text-base md:text-lg font-medium text-gray-900 hover:text-yellow-600 transition-colors"
                    >
                      aurea.co.store@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-gray-600 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Horario de Atención
                    </p>
                    <p className="text-base md:text-lg font-medium text-gray-900">
                      Lunes a Viernes, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Última actualización */}
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Última actualización: Octubre 2025
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
