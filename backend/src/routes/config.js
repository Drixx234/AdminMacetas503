import express from "express";
import configController from "../controller/configController.js";

const router = express.Router();

router.route("/")
    .get(configController.getConfig)
    .post(configController.createConfig);

router.route("/:id")
    .put(configController.updateConfig)
    .delete(configController.deleteConfig);

export default router;