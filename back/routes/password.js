const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const ResetToken = require("../models/ResetToken");
const User = require("../models/User");
const crypto = require('crypto');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: 587, // Puerto para TLS
  secure: true, // Habilitar TLS
});


async function generateResetToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
        return;
      }
      const token = buffer.toString('hex');
      resolve(token);
    });
  });
}

// Ruta para solicitar una recuperación de contraseña
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
  const resetToken = await generateResetToken();

  // Crea una instancia del modelo ResetToken
  const resetTokenInstance = new ResetToken({
    token: resetToken,
    userEmail: email,
  });

    // Guarda el token en la base de datos
    await resetTokenInstance.save();

    const mailOptions = {
      from: "erik.grben@gmail.com",
      to: email,
      subject: "Recuperación de contraseña",
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetToken}`,
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    res.status(200).json({ message: "Correo electrónico de recuperación de contraseña enviado." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud." });
  }
});


router.get("/reset-password/:token", async (req, res) => {
    const token = req.params.token;
    try {
        // Busca el token en la base de datos
        const resetToken = await ResetToken.findOne({ token });
    
        // Si el token no existe o ha expirado, muestra un mensaje de error o redirige a una página de error
        if (!resetToken || resetToken.expiresAt < new Date()) {
          // Puedes redirigir a una página de error aquí si lo deseas
          return res.status(400).json({ error: "El token no es válido o ha expirado." });
        }
    
        // Si el token es válido, puedes mostrar una página de restablecimiento de contraseña
        res.render("reset-password", { token }); // Esto es un ejemplo, debes adaptarlo a tu estructura de rutas y vistas
    
      } catch (error) {
        console.error("Error al procesar el token de restablecimiento de contraseña:", error);
        res.status(500).json({ error: "Error al procesar el token de restablecimiento de contraseña." });
      }
    });

router.get("/:token", async (req, res) => {
    const token = req.params.token;
  
    try {
      // Busca el token en la base de datos
      const resetToken = await ResetToken.findOne({ token });
  
      // Si el token no existe o ha expirado, muestra un mensaje de error o redirige a una página de error
      if (!resetToken || resetToken.expiresAt < new Date()) {
        return res.status(400).json({ error: "El token no es válido o ha expirado." });
      }
  
      // Puedes implementar la lógica para mostrar un formulario de restablecimiento de contraseña aquí
      // Esto podría incluir la validación de la nueva contraseña y la actualización de la contraseña en la base de datos
      // Por ejemplo:
      const newPassword = req.body.password;
      const user = await User.findOne({ email: resetToken.userEmail });
      user.password = newPassword;
      await user.save();
  
      // Elimina el token de la base de datos para que no se pueda utilizar nuevamente
      await resetToken.remove();
  
      res.status(200).json({ message: "Token válido. Puede restablecer su contraseña." });
    } catch (error) {
      console.error("Error al procesar el token de restablecimiento de contraseña:", error);
      res.status(500).json({ error: "Error al procesar el token de restablecimiento de contraseña." });
    }
  });
  
  
module.exports = router;