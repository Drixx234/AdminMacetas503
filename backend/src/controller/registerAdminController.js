import nodemailer from "nodemailer"; //envía correos electrónicos
import crypto from "crypto"; //genera tokens aleatorios
import jsonwebtoken from "jsonwebtoken"; //genera tokens JWT para autenticación
import bcryptjs from "bcryptjs"; //hashea contraseñas

import HTMLRegisterEmail from "../utils/sendMaildRegisterAdmin.js";

import config from "../../config.js";

import adminModel from "../models/admin.js";

const registerAdminController = {};

registerAdminController.register = async (req, res) => {
    try {
        //solicitar datos
        const { name, email, password } = req.body;

        //validar si ya existe
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'El administrador ya existe' });
        }

        //encriptar contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //generar un codigo aleatorio (normalizado a mayúsculas)
        const randomCode = crypto.randomBytes(3).toString("hex").toUpperCase();

        //guardar todo en un token
        const token = jsonwebtoken.sign(
            {
                randomCode,
                name,
                email,
                password: passwordHashed,
            },
            //secret key
            config.JWT.secret,
            //tiempo de expiracion del token
            { expiresIn: "15m" }
        );

        //guardar el token en una cookie
        res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

        //enviar el correo con el codigo de verificacion
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Código de verificación",
            text: "El vence en 15 minutos",
            html: HTMLRegisterEmail(randomCode)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error sending email' });
            }
            return res.status(200).json({ message: 'Email sent successfully', email });
        });

    } catch (error) {
        console.log("error" + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//verificar el codigo de verificacion
registerAdminController.verifyCode = async (req, res) => {
    try {

        //1. Solicitar el código de verificación enviado por el frontend
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: 'El código es obligatorio' });
        }

        //2. Obtener el token de la cookie
        const token = req.cookies.registrationCookie;

        if (!token) {
            return res.status(400).json({ message: 'No hay un registro pendiente. Vuelve a registrarte.' });
        }

        //extraer la información del token (puede fallar si expiró o es inválido)
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.JWT.secret);
        } catch (err) {
            res.clearCookie("registrationCookie");
            return res.status(400).json({ message: 'El código expiró. Vuelve a registrarte.' });
        }

        const { randomCode, name, email, password } = decoded;

        //3. Comparar el código de verificación con el código generado (sin distinguir mayúsculas/minúsculas)
        if (code.toUpperCase() !== randomCode) {
            return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }

        //4. Si el código es correcto, guardar el administrador en la base de datos
        const newAdmin = new adminModel({
            name,
            email,
            password,
            isVerified: true
        });

        await newAdmin.save();

        //5. Eliminar la cookie de registro
        res.clearCookie("registrationCookie");

        return res.status(200).json({ message: 'Administrador registrado exitosamente' });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default registerAdminController;