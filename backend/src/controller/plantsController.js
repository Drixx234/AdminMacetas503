import plantsModel from "../models/plants.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const plantsController = {};

//GET
plantsController.getAll = async (req, res) => {
    try {
        const plants = await plantsModel.find();
        res.status(200).json(plants);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
plantsController.create = async (req, res) => {
    try {
        const { name, care, size, price, stock, product_id } = req.body;

        const newPlants = new plantsModel({
            name,
            care,
            size,
            price,
            stock,
            image: req.file.path,
            product_id,
            public_id: req.file.filename,
        });
        await newPlants.save();

        res.status(201).json({ message: 'Plants created successfully', plants: newPlants });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
plantsController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const plantsToDelete = await plantsModel.findById(id);

        if (!plantsToDelete) {
            return res.status(404).json({ message: 'Candle not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(plantsToDelete.public_id);
        // Eliminar el documento de la base de datos
        await plantsModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Plants deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
plantsController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, care, size, price, stock, product_id } = req.body;
        const plantsToUpdate = await plantsModel.findById(id);

        if (!plantsToUpdate) {
            return res.status(404).json({ message: 'Plants not found' });
        }

        const updatedData = { name, care, size, price, stock, product_id };

        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(plantsToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        const updatedPlants = await plantsModel.findByIdAndUpdate(id,
            updatedData,
            {new: true});

        return res.status(200).json({ message: "Plants updated", plants: updatedPlants })
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default plantsController;