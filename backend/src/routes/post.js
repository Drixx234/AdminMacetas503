import express from "express";
import postController from "../controller/postController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

// Rutas para las velas
router.route("/")
    .get(postController.getAll) // Obtener todas las velas
    .post(upload.single("image"), postController.create); // Crear una nueva vela con imagen

router.route("/:id")
    .delete(postController.delete) // Eliminar una vela por ID
    .put(upload.single("image"), postController.update); // Actualizar una vela por ID

export default router;