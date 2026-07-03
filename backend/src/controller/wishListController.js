import wishListModel from "../models/wishlist.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const wishListController = {};

//GET
wishListController.getAll = async (req, res) => {
    try {
        const wishList = await wishListModel.find();
        res.status(200).json(wishList);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
wishListController.create = async (req, res) => {
    try {
        const { name, description, price, stock, color} = req.body;

        const newWishListItem = new wishListModel({
            client_id,
            post,
            creation_date,
            isActive: true
        });
        await newWishListItem.save();

        res.status(201).json({ message: 'Wish List Item created successfully', wishListItem: newWishListItem });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
wishListController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const wishListItemToDelete = await wishListModel.findById(id);

        if (!wishListItemToDelete) {
            return res.status(404).json({ message: 'Wish List Item not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(wishListItemToDelete.public_id);
        // Eliminar el documento de la base de datos
        await wishListModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Wish List Item deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
wishListController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, color} = req.body;
        const wishListItemToUpdate = await wishListModel.findById(id);

        if (!wishListItemToUpdate) {
            return res.status(404).json({ message: 'Wish List Item not found' });
        }
       
        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(wishListItemToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        await wishListModel.findByIdAndUpdate(req.params.id,
            updatedData,
            {new: true});

        return res.status(200).json({message: "Wish List Item updated"})
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default wishListController;