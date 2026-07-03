import express from "express";
import servicesController from "../controller/servicesController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

// Rutas para las velas
router.route("/")
    .get(servicesController.getAll) // Obtener todas las velas
    .post(upload.single("image"), servicesController.create); // Crear una nueva vela con imagen

router.route("/:id")
    .delete(servicesController.delete) // Eliminar una vela por ID
    .put(upload.single("image"), servicesController.update); // Actualizar una vela por ID

export default router;