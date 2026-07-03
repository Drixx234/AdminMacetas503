import candleModel from "../models/candles.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const candlesController = {};

//GET
candlesController.getAll = async (req, res) => {
    try {
        const candles = await candleModel.find();
        res.status(200).json(candles);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
candlesController.create = async (req, res) => {
    try {
        const { name, description, price, stock, color} = req.body;

        const newCandle = new candleModel({
            name,
            description,
            price,
            stock,
            color,
            image: req.file.path,
            public_id: req.file.filename,
            isActive: true
        });
        await newCandle.save();

        res.status(201).json({ message: 'Candle created successfully', candle: newCandle });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
candlesController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const candleToDelete = await candleModel.findById(id);

        if (!candleToDelete) {
            return res.status(404).json({ message: 'Candle not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(candleToDelete.public_id);
        // Eliminar el documento de la base de datos
        await candleModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Candle deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
candlesController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, scent, size, price, stock, color } = req.body;
        const candleToUpdate = await candleModel.findById(id);

        if (!candleToUpdate) {
            return res.status(404).json({ message: 'Candle not found' });
        }

        const updatedData = { name, description, scent, size, price, stock, color };

        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(candleToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        const updatedCandle = await candleModel.findByIdAndUpdate(id,
            updatedData,
            {new: true});

        return res.status(200).json({ message: "Candle updated", candle: updatedCandle })
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default candlesController;