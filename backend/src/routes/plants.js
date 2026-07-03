import express from "express";
import plantsController from "../controller/plantsController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

// Rutas para las velas
router.route("/")
    .get(plantsController.getAll) // Obtener todas las velas
    .post(upload.single("image"), plantsController.create); // Crear una nueva vela con imagen

router.route("/:id")
    .delete(plantsController.delete) // Eliminar una vela por ID
    .put(upload.single("image"), plantsController.update); // Actualizar una vela por ID

export default router;
