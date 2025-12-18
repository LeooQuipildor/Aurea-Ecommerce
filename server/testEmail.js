/**
 * Script de prueba para verificar la configuración de email
 * Ejecutar con: node testEmail.js
 */

require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("🔍 Verificando configuración de email...\n");

// Verificar variables de entorno
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER || "❌ NO CONFIGURADO");
console.log(
  "🔑 EMAIL_PASSWORD:",
  process.env.EMAIL_PASSWORD ? "✅ CONFIGURADO" : "❌ NO CONFIGURADO"
);
console.log("");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error("❌ ERROR: Falta configurar EMAIL_USER o EMAIL_PASSWORD en .env");
  console.log("\n📝 Asegúrate de tener en tu archivo .env:");
  console.log("EMAIL_USER=aurea.co.store@gmail.com");
  console.log("EMAIL_PASSWORD=tu_contraseña_de_aplicacion");
  process.exit(1);
}

// Crear transportador
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log("📨 Intentando enviar email de prueba...\n");

// Enviar email de prueba
const mailOptions = {
  from: {
    name: "AURÉA Test",
    address: process.env.EMAIL_USER,
  },
  to: process.env.EMAIL_USER, // Enviar a ti mismo
  subject: "✅ Test de Configuración de Email - AURÉA",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #000; color: #F4C430; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px; letter-spacing: 3px;">AURÉA</h1>
      </div>
      <div style="background: #fff; padding: 30px; border: 1px solid #eee;">
        <h2 style="color: #000;">✅ ¡Configuración Exitosa!</h2>
        <p>Si estás leyendo este email, significa que la configuración de Nodemailer con Gmail está funcionando correctamente.</p>
        <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #F4C430;">
          <p><strong>Detalles de la configuración:</strong></p>
          <p>📧 Email: ${process.env.EMAIL_USER}</p>
          <p>🔑 Contraseña: Configurada correctamente</p>
          <p>📅 Fecha: ${new Date().toLocaleString()}</p>
        </div>
        <p>Ahora puedes usar el sistema de emails en tu aplicación AURÉA.</p>
      </div>
      <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <p>AURÉA - Sistema de Emails</p>
      </div>
    </div>
  `,
};

transporter
  .sendMail(mailOptions)
  .then((info) => {
    console.log("✅ EMAIL ENVIADO EXITOSAMENTE!");
    console.log("📬 Message ID:", info.messageId);
    console.log("\n🎉 La configuración está funcionando correctamente.");
    console.log("📥 Revisa tu bandeja de entrada:", process.env.EMAIL_USER);
    console.log("   (También revisa la carpeta de spam)");
  })
  .catch((error) => {
    console.error("❌ ERROR AL ENVIAR EMAIL:");
    console.error("");
    
    if (error.code === "EAUTH") {
      console.error("🔐 ERROR DE AUTENTICACIÓN");
      console.error("");
      console.error("Posibles causas:");
      console.error("1. La contraseña de aplicación es incorrecta");
      console.error("2. No has habilitado la verificación en 2 pasos en Gmail");
      console.error("3. La contraseña tiene espacios (debe ser 16 caracteres sin espacios)");
      console.error("");
      console.error("📋 Pasos para solucionar:");
      console.error("1. Ve a: https://myaccount.google.com/security");
      console.error("2. Habilita 'Verificación en 2 pasos'");
      console.error("3. Ve a 'Contraseñas de aplicaciones'");
      console.error("4. Genera una nueva contraseña de aplicación");
      console.error("5. Copia los 16 caracteres SIN ESPACIOS");
      console.error("6. Actualiza EMAIL_PASSWORD en tu archivo .env");
    } else if (error.code === "ECONNECTION") {
      console.error("🌐 ERROR DE CONEXIÓN");
      console.error("");
      console.error("Posibles causas:");
      console.error("1. No tienes conexión a internet");
      console.error("2. Gmail está bloqueado por tu firewall");
      console.error("3. Problemas con tu red");
    } else {
      console.error("Código de error:", error.code);
      console.error("Mensaje:", error.message);
    }
    
    console.error("");
    console.error("📖 Para más ayuda, revisa: EMAIL_SETUP.md");
  });
