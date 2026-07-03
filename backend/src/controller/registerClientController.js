import nodemailer from "nodemailer"; //envía correos electrónicos
import crypto from "crypto"; //genera tokens aleatorios
import jsonwebtoken from "jsonwebtoken"; //genera tokens JWT para autenticación
import bcryptjs from "bcryptjs"; //hashea contraseñas
import cloudinary from "cloudinary"; //configuración de Cloudinary para subir imágenes


import HTMLRegisterEmail from "../utils/sendMaildRegisterClient.js"; //plantilla HTML para el correo de registro

import  config  from "../../config.js"; //importa configuración del proyecto, como la clave secreta para JWT

import clientModel from "../models/client.js"; //modelo de cliente para interactuar con la base de datos

const registerClientController = {};

registerClientController.register = async (req, res) => {
    try {
        //solicitar datos
        const { 
            name,
            lastName,
            email,
            password,
            phone,
            address,
            loginAttempts,
            timeOut
                } = req.body;

        //validar si ya existe
        const existingClient = await clientModel.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: 'El cliente ya existe' });
        }

        //encriptar contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);
        
        //generar un codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //normalizamos el código a mayúsculas para comparar sin problemas de mayúsc/minúsc
        const normalizedCode = randomCode.toUpperCase();

        //guardar todo en un token
        const token = jsonwebtoken.sign(
            { 
                randomCode: normalizedCode,
                name,
                lastName,
                email,
                password: passwordHashed,
                phone,
                address,
                loginAttempts,
                timeOut
            },
            //secret key
            config.JWT.secret,
            //tiempo de expiracion del token
            { expiresIn: "15m" }
        );

        //guardar el token en una cookie
        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000});

        //enviar el correo con el codigo de verificacion
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        //mail options ¿quien lo recibe y como?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Código de verificación",
            text: "El vence en 15 minutos",
            html: HTMLRegisterEmail(normalizedCode)
        };

         //3. Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error sending email' });
            }
            return res.status(200).json({ message: 'Email sent successfully', email });
        });


    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//verificar el codigo de verificacion
registerClientController.verifyCode = async (req, res) => {
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

        const { randomCode, name, lastName, email, password, phone, address, loginAttempts, timeOut } = decoded;

        //3. Comparar el código de verificación con el código generado (sin distinguir mayúsculas/minúsculas)
        if (code.toUpperCase() !== randomCode) {
            return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }

        //4. Si el código es correcto, guardar el cliente en la base de datos
        const newClient = new clientModel({
            name,
            lastName,
            email,
            password,
            phone,
            address,
            loginAttempts,
            timeOut,
            isVerified: true,
        });

        await newClient.save();

        //5. Eliminar la cookie de registro
        res.clearCookie("registrationCookie");

        return res.status(200).json({ message: 'Cliente registrado exitosamente' });
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default registerClientController;