import postModel from "../models/post.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const postController = {};

//GET
postController.getAll = async (req, res) => {
    try {
        const candles = await postModel.find();
        res.status(200).json(candles);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
postController.create = async (req, res) => {
    try {
        const { name, description,dimensions, weight, price, stock, color} = req.body;

        const newPost = new postModel({
            name,
            description,
            dimensions,
            weight,
            price,
            stock,
            color,
            image: req.file.path,
            public_id: req.file.filename,
            isActive: true
        });
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
postController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const postToDelete = await postModel.findById(id);

        if (!postToDelete) {
            return res.status(404).json({ message: 'Candle not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(postDelete.public_id);
        // Eliminar el documento de la base de datos
        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
postController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, color} = req.body;
        const postToUpdate = await postModel.findById(id);

        if (!postToUpdate) {
            return res.status(404).json({ message: 'Candle not found' });
        }
       
        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(postToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        await candleModel.findByIdAndUpdate(req.params.id,
            updatedData,
            {new: true});

        return res.status(200).json({message: "Post updated"})
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default postController;