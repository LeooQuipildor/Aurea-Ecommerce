const nodemailer = require("nodemailer");

/**
 * Configuración del transportador de email (Gmail)
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // aurea.co.store@gmail.com
      pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación de Gmail
    },
  });
};

/**
 * Enviar email de confirmación de pedido al cliente
 */
const sendOrderConfirmationEmail = async (orderData) => {
  try {
    const transporter = createTransporter();

    const { orderId, customerData, cart, totalPrice } = orderData;

    // Generar lista de productos
    const productList = cart
      .map(
        (item) =>
          `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} x ${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    const mailOptions = {
      from: {
        name: "AURÉA",
        address: process.env.EMAIL_USER,
      },
      to: customerData.email,
      subject: `✅ Pedido Confirmado #${orderId} - AURÉA`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #F4C430; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 32px; letter-spacing: 3px; }
            .content { background: #fff; padding: 30px; }
            .order-details { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .products-table { width: 100%; margin: 20px 0; }
            .total { font-size: 20px; font-weight: bold; color: #F4C430; text-align: right; margin-top: 20px; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #F4C430; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 3px; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AURÉA</h1>
              <p style="margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">JOYERÍA MINIMALISTA</p>
            </div>
            
            <div class="content">
              <h2 style="color: #000;">¡Gracias por tu pedido, ${customerData.nombre}!</h2>
              <p>Hemos recibido tu pedido correctamente. A continuación encontrarás los detalles:</p>
              
              <div class="order-details">
                <h3 style="margin-top: 0; color: #F4C430;">Pedido #${orderId}</h3>
                <p><strong>Nombre:</strong> ${customerData.nombre} ${customerData.apellido}</p>
                <p><strong>WhatsApp:</strong> +57 ${customerData.whatsapp}</p>
                <p><strong>Dirección:</strong> ${customerData.direccion}, ${customerData.ciudad}, ${customerData.departamento}</p>
                <p><strong>Referencia:</strong> ${customerData.referencia}</p>
              </div>

              <h3>Productos:</h3>
              <table class="products-table">
                ${productList}
              </table>
              
              <div class="total">
                Total: $${totalPrice.toLocaleString()}
              </div>

              <p style="margin-top: 30px;">
                <strong>Método de pago:</strong> Pago contra entrega (efectivo)
              </p>

              <p>Te contactaremos pronto por WhatsApp para confirmar la entrega.</p>

              <center>
                <a href="https://wa.me/573218422436?text=Hola,%20tengo%20una%20consulta%20sobre%20mi%20pedido%20${orderId}" class="button">
                  Contactar por WhatsApp
                </a>
              </center>
            </div>

            <div class="footer">
              <p><strong>AURÉA</strong> - Joyería Minimalista de Lujo</p>
              <p>Colombia | aurea.co.store@gmail.com</p>
              <p>
                <a href="https://www.instagram.com/aurea.only" style="color: #F4C430; text-decoration: none;">Instagram: @aurea.only</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email de confirmación enviado:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error al enviar email de confirmación:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Enviar notificación de nuevo pedido al admin
 */
const sendNewOrderNotificationToAdmin = async (orderData) => {
  try {
    const transporter = createTransporter();

    const { orderId, customerData, cart, totalPrice } = orderData;

    const productList = cart
      .map((item) => `• ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`)
      .join("\n");

    const mailOptions = {
      from: {
        name: "AURÉA Sistema",
        address: process.env.EMAIL_USER,
      },
      to: process.env.EMAIL_USER, // Email del admin
      subject: `🔔 Nuevo Pedido #${orderId} - $${totalPrice.toLocaleString()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
            .alert { background: #F4C430; color: #000; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; }
            .content { background: #fff; padding: 30px; margin-top: 20px; }
            .info-box { background: #f9f9f9; padding: 15px; margin: 10px 0; border-left: 4px solid #F4C430; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              🔔 NUEVO PEDIDO RECIBIDO
            </div>
            
            <div class="content">
              <h2>Pedido #${orderId}</h2>
              
              <div class="info-box">
                <h3>Información del Cliente:</h3>
                <p><strong>Nombre:</strong> ${customerData.nombre} ${customerData.apellido}</p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/57${customerData.whatsapp}">+57 ${customerData.whatsapp}</a></p>
                <p><strong>Email:</strong> ${customerData.email}</p>
              </div>

              <div class="info-box">
                <h3>Dirección de Entrega:</h3>
                <p>${customerData.direccion}</p>
                <p>${customerData.ciudad}, ${customerData.departamento}</p>
                <p><strong>Referencia:</strong> ${customerData.referencia}</p>
              </div>

              <div class="info-box">
                <h3>Productos:</h3>
                <pre style="font-family: monospace; white-space: pre-wrap;">${productList}</pre>
                <p style="font-size: 18px; font-weight: bold; color: #F4C430; margin-top: 15px;">
                  Total: $${totalPrice.toLocaleString()}
                </p>
              </div>

              <p style="margin-top: 30px;">
                <a href="https://wa.me/57${customerData.whatsapp}?text=Hola%20${customerData.nombre},%20recibimos%20tu%20pedido%20${orderId}" 
                   style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Contactar Cliente por WhatsApp
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Notificación de admin enviada:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error al enviar notificación al admin:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Enviar confirmación de mensaje de contacto
 */
const sendContactConfirmationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const { firstName, lastName, email, message } = contactData;

    const mailOptions = {
      from: {
        name: "AURÉA",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "✅ Mensaje Recibido - AURÉA",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #F4C430; padding: 30px; text-align: center; }
            .content { background: #fff; padding: 30px; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px; letter-spacing: 3px;">AURÉA</h1>
            </div>
            
            <div class="content">
              <h2>¡Gracias por contactarnos, ${firstName}!</h2>
              <p>Hemos recibido tu mensaje correctamente. Te responderemos a la brevedad.</p>
              
              <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #F4C430;">
                <p><strong>Tu mensaje:</strong></p>
                <p style="font-style: italic;">"${message}"</p>
              </div>

              <p>Nuestro equipo revisará tu consulta y te responderá pronto.</p>
            </div>

            <div class="footer">
              <p><strong>AURÉA</strong> - Joyería Minimalista de Lujo</p>
              <p>Colombia | aurea.co.store@gmail.com</p>
              <p>WhatsApp: +57 321 842 2436</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email de contacto enviado:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error al enviar email de contacto:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Notificar al admin sobre nuevo mensaje de contacto
 */
const sendNewContactNotificationToAdmin = async (contactData) => {
  try {
    const transporter = createTransporter();

    const { firstName, lastName, email, phone, message } = contactData;

    const mailOptions = {
      from: {
        name: "AURÉA Sistema",
        address: process.env.EMAIL_USER,
      },
      to: process.env.EMAIL_USER,
      subject: `📩 Nuevo Mensaje de Contacto - ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
            .alert { background: #F4C430; color: #000; padding: 20px; text-align: center; font-size: 20px; font-weight: bold; }
            .content { background: #fff; padding: 30px; margin-top: 20px; }
            .info-box { background: #f9f9f9; padding: 15px; margin: 10px 0; border-left: 4px solid #F4C430; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              📩 NUEVO MENSAJE DE CONTACTO
            </div>
            
            <div class="content">
              <div class="info-box">
                <h3>Información del Contacto:</h3>
                <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Teléfono:</strong> <a href="https://wa.me/57${phone}">+57 ${phone}</a></p>
              </div>

              <div class="info-box">
                <h3>Mensaje:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>

              <p style="margin-top: 30px;">
                <a href="mailto:${email}?subject=Re:%20Tu%20consulta%20en%20AURÉA" 
                   style="display: inline-block; background: #F4C430; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px;">
                  Responder por Email
                </a>
                <a href="https://wa.me/57${phone}" 
                   style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Responder por WhatsApp
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Notificación de contacto al admin enviada:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error al enviar notificación de contacto:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendNewOrderNotificationToAdmin,
  sendContactConfirmationEmail,
  sendNewContactNotificationToAdmin,
};
