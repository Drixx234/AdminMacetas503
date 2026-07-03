import express from "express";
import candlesController from "../controller/candlesController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

// Rutas para las velas
router.route("/")
    .get(candlesController.getAll) // Obtener todas las velas
    .post(upload.single("image"), candlesController.create); // Crear una nueva vela con imagen

router.route("/:id")
    .delete(candlesController.delete) // Eliminar una vela por ID
    .put(upload.single("image"), candlesController.update); // Actualizar una vela por ID

export default router;
