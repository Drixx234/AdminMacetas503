import configModel from "../models/config.js";

//array de funciones
const configController = {};

//GET
configController.getConfig = async (req, res) => {
    try {
        const config = await configModel.find();
        return res.status(200).json(config);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//INSERT
configController.createConfig = async (req, res) => {
    try {
        const { stockMin, temporarilyOutOfStock } = req.body;

        const newConfig = new configModel({
            stockMin,
            temporarilyOutOfStock
        });

        await newConfig.save();

        return res.status(201).json({
            message: "Config created successfully",
            config: newConfig
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//UPDATE
configController.updateConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const { stockMin, temporarilyOutOfStock } = req.body;
        const updatedConfig = await configModel.findByIdAndUpdate(id, {
            stockMin,
            temporarilyOutOfStock
        }, { new: true });

        return res.status(200).json({
            message: "Config updated successfully",
            config: updatedConfig
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//DELETE
configController.deleteConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedConfig = await configModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Config deleted successfully",
            config: deletedConfig
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export default configController;