import express from "express";
import wishListController from "../controller/wishListController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

// Rutas para los artículos de la lista de deseos
router.route("/")
    .get(wishListController.getAll) // Obtener todos los artículos de la lista de deseos
    .post(upload.single("image"), wishListController.create); // Crear un nuevo artículo en la lista de deseos con imagen

router.route("/:id")
    .delete(wishListController.delete) // Eliminar un artículo de la lista de deseos por ID
    .put(upload.single("image"), wishListController.update); // Actualizar un artículo de la lista de deseos por ID

export default router;
