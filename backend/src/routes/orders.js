import express from "express";
import ordersController from "../controller/ordersController.js";

const router = express.Router();

router.route("/")
    .get(ordersController.getAll); // Listar todas las órdenes (admin)

router.route("/:id")
    .delete(ordersController.delete); // Eliminar una orden

router.route("/:id/status")
    .patch(ordersController.updateStatus); // Cambiar solo el estatus de una orden

export default router;
