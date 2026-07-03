import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import HTMLRecoveryPasswordEmail from "../utils/sendMaildRecoveryClient.js";

import { config } from "../../config.js";

import adminModel from "../models/admin.js";

const recoveryPasswordAdminController = {}

recoveryPasswordAdminController.requestCode = async (req, res) => {
    try {
        //Solicitamos los datos
        const { email } = req.body;

        //validar que el email exista
        const adminFound = await adminModel.findOne({ email });

        if (!adminFound) {
            return res.status(404).json({ message: "Admin not found" });
        }

        //generar un codigo aleatorio (normalizado a mayúsculas)
        const randomCode = crypto.randomBytes(3).toString("hex").toUpperCase();

        //guardar el codigo en un token
        const token = jsonwebtoken.sign(
            { email, randomCode, userType: "admin", verify: false },
            config.JWT.secret,
            { expiresIn: "15m" }
        );

        res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

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
            subject: "Recovery code",
            text: "El vence en 15 minutos",
            html: HTMLRecoveryPasswordEmail(randomCode)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email", error);
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Recovery code sent to email" });
        });

    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

recoveryPasswordAdminController.verifyCode = async (req, res) => {
    try {

        //Solicitamos los datos
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "El código es obligatorio" });
        }

        //obtener el token de las cookies
        const token = req.cookies.recoveryCookie;

        if (!token) {
            return res.status(400).json({ message: "No hay una recuperación pendiente. Solicita el código de nuevo." });
        }

        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.JWT.secret);
        } catch (err) {
            res.clearCookie("recoveryCookie");
            return res.status(400).json({ message: "El código expiró. Solicítalo de nuevo." });
        }

        //comparar el código que nos envió el usuario con el código del token (sin distinguir mayúsculas/minúsculas)
        if (code.toUpperCase() !== decoded.randomCode) {
            return res.status(400).json({ message: "Código de verificación incorrecto" });
        }

        //marcar en el token que el código ya fue verificado
        const newToken = jsonwebtoken.sign(
            { email: decoded.email, userType: "admin", verify: true },
            config.JWT.secret,
            { expiresIn: "15m" }
        );

        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });

        return res.status(200).json({ message: "Código verificado correctamente" });

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

recoveryPasswordAdminController.newPassword = async (req, res) => {
    try {

        const { newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Ambos campos de contraseña son obligatorios" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const token = req.cookies.recoveryCookie;

        if (!token) {
            return res.status(400).json({ message: "No hay una recuperación pendiente. Solicita el código de nuevo." });
        }

        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, config.JWT.secret);
        } catch (err) {
            res.clearCookie("recoveryCookie");
            return res.status(400).json({ message: "La sesión de recuperación expiró. Empieza de nuevo." });
        }

        //verificar que ya se haya pasado por el paso de código correcto
        if (!decoded.verify) {
            return res.status(400).json({ message: "Code not verified" });
        }

        //encriptar la nueva contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);

        //actualizar la contraseña en la base de datos
        await adminModel.findOneAndUpdate(
            { email: decoded.email },
            { password: passwordHash },
            { new: true }
        );

        res.clearCookie("recoveryCookie");

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default recoveryPasswordAdminController;