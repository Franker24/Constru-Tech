import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configuración de CORS para permitir a tu Vite (5173)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET'],
    credentials: true
}));

app.use(express.json());

// Configuramos el transporte de correo
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

// Verificar conexión con Gmail al arrancar
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Error de configuración de Gmail:", error.message);
    } else {
        console.log("📧 Servidor listo para enviar correos");
    }
});

app.post('/api/contact', async (req, res) => {
    const { nombre, email, proyecto, mensaje } = req.body;

    const mailOptions = {
        from: `"${nombre}" <${process.env.EMAIL_USER}>`, // Gmail requiere que el 'from' sea el dueño de la cuenta
        to: process.env.EMAIL_USER, // Te lo envías a ti mismo
        replyTo: email, // Para que al dar "Responder" le escribas al cliente
        subject: `🏗️ Nuevo Cliente: ${proyecto}`,
        html: `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #c5a059;">Nueva consulta de ConstruTech</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email del cliente:</strong> ${email}</p>
                <p><strong>Interés:</strong> ${proyecto}</p>
                <p><strong>Mensaje:</strong></p>
                <p style="background: #f9f9f9; padding: 10px;">${mensaje}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Mail enviado de:", nombre);
        res.status(200).json({ success: true, message: "Enviado correctamente" });
    } catch (error) {
        console.error("❌ Falló el envío:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server en http://localhost:${PORT}`);
});