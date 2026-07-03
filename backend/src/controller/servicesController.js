import servicesModel from "../models/services.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const servicesController = {};

//GET
servicesController.getAll = async (req, res) => {
    try {
        const services = await servicesModel.find();
        res.status(200).json(services);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
servicesController.create = async (req, res) => {
    try {
        const { name, description, price,} = req.body;

        const newServices = new servicesModel({
            name,
            description,
            price
        });
        await newServices.save();

        res.status(201).json({ message: 'Service created successfully'});
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
servicesController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const servicesToDelete = await servicesModel.findById(id);

        if (!servicesToDelete) {
            return res.status(404).json({ message: 'Services not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(candleToDelete.public_id);
        // Eliminar el documento de la base de datos
        await candleModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
servicesController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price} = req.body;
        const servicesToUpdate = await servicesModel.findById(id);

        if (!servicesToUpdate) {
            return res.status(404).json({ message: 'Services not found' });
        }
       
        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(servicesToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        await servicesModel.findByIdAndUpdate(req.params.id,
            updatedData,
            {new: true});

        return res.status(200).json({message: "Services updated"})
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default servicesController;