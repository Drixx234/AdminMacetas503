import express from "express";
import offersController from "../controller/offersController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

// Rutas para las ofertas
router.route("/")
    .get(offersController.getAll) // Obtener todas las ofertas
    .post(upload.single("image"), offersController.create); // Crear una nueva oferta con imagen

router.route("/:id")
    .delete(offersController.delete) // Eliminar una oferta por ID
    .put(upload.single("image"), offersController.update); // Actualizar una oferta por ID

export default router;