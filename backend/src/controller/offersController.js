import offersModel from "../models/offers.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const offersController = {};

//GET
offersController.getAll = async (req, res) => {
    try {
        const offers = await offersModel.find();
        res.status(200).json(offers);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
offersController.create = async (req, res) => {
    try {
        const { title, description, discount, ofert_price, stock } = req.body;

        const newOffer = new offersModel({
            title,
            description,
            discount,
            ofert_price,
            stock,
            image: req.file.path,
            public_id: req.file.filename,
            isActive: true
        });
        await newOffer.save();

        res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
offersController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const offerToDelete = await offersModel.findById(id);

        if (!offerToDelete) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(offerToDelete.public_id);
        // Eliminar el documento de la base de datos
        await offersModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
offersController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, discount, ofert_price, stock } = req.body;
        const offerToUpdate = await offersModel.findById(id);

        if (!offerToUpdate) {
            return res.status(404).json({ message: 'Offer not found' });
        }
       
        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(offerToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        await offersModel.findByIdAndUpdate(req.params.id,
            updatedData,
            {new: true});

        return res.status(200).json({message: "Offer updated"})
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default offersController;