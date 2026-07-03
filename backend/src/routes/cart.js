import express from "express";
import cartController from "../controller/cartController.js";

const router = express.Router();

router.route("/")
    .get(cartController.getCart)
    .post(cartController.createCart);

router.route("/:id")
    .put(cartController.updateCart)
    .delete(cartController.deleteCart);

export default router;