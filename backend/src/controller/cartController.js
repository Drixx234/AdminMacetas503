import cartModel from "../models/cart.js";
import clientModel from "../models/client.js";
import postModel from "../models/post.js";
import plantModel from "../models/plants.js";
import candleModel from "../models/candles.js";

//array de funciones
const cartController = {};

cartController.getCart = async (req, res) => {
    try {

        const carts = await cartModel.find()
            .populate("clientId", "name email")
            .populate("products.postId", "name price image")
            .populate("products.candleId", "name price image")
            .populate("products.plantsId", "name price image");

        const response = carts.map(cart => {

            const products = cart.products.map(item => {

                return {
                    product: item.postId || item.candleId || item.plantsId,
                    quantity: item.quantity,
                    subtotal: item.subtotal
                };

            });

            return {
                _id: cart._id,
                clientId: cart.clientId,
                products,
                total: cart.total,
                status: cart.status,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt
            };

        });

        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//insert
cartController.createCart = async (req, res) => {
    try {

        const { clientId, products, status } = req.body;

        let total = 0;
        let newProducts = [];

        for (const item of products) {

            let productFound = null;
            let subtotal = 0;

            if (item.postId) {

                productFound = await postModel.findById(item.postId);

                if (!productFound) {
                    return res.status(404).json({
                        message: "Post no encontrado"
                    });
                }

                subtotal = productFound.price * item.quantity;

                newProducts.push({
                    postId: item.postId,
                    quantity: item.quantity,
                    subtotal
                });

            } else if (item.candleId) {

                productFound = await candleModel.findById(item.candleId);

                if (!productFound) {
                    return res.status(404).json({
                        message: "Candle no encontrada"
                    });
                }

                subtotal = productFound.price * item.quantity;

                newProducts.push({
                    candleId: item.candleId,
                    quantity: item.quantity,
                    subtotal
                });

            } else if (item.plantsId) {

                productFound = await plantModel.findById(item.plantsId);

                if (!productFound) {
                    return res.status(404).json({
                        message: "Planta no encontrada"
                    });
                }

                subtotal = productFound.price * item.quantity;

                newProducts.push({
                    plantsId: item.plantsId,
                    quantity: item.quantity,
                    subtotal
                });

            } else {

                return res.status(400).json({
                    message: "El producto no tiene un tipo válido."
                });

            }

            total += subtotal;
        }

        const newCart = new cartModel({
            clientId,
            products: newProducts,
            total,
            status
        });

        await newCart.save();

        return res.status(201).json({
            message: "Cart created successfully",
            cart: newCart
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

cartController.updateCart = async (req, res) => {
    try {

        const { id } = req.params;
        const { products, status } = req.body;

        const cart = await cartModel.findById(id);

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        let total = 0;
        let newProducts = [];

        for (const item of products) {

            let productFound = null;
            let subtotal = 0;

            if (item.postId) {

                productFound = await postModel.findById(item.postId);

                if (!productFound) {
                    return res.status(404).json({
                        message: "Post no encontrado"
                    });
                }

                subtotal = productFound.price * item.quantity;

                newProducts.push({
                    postId: item.postId,
                    quantity: item.quantity,
                    subtotal
                });

            } else if (item.candleId) {

                productFound = await candleModel.findById(item.candleId);

                if (!productFound) {
                    return res.status(404).json({
                        message: "Candle no encontrada"
                    });
                }

                subtotal = productFound.price * item.quantity;

                newProducts.push({
                    candleId: item.candleId,
                    quantity: item.quantity,
                    subtotal
                });

            } else if (item.plantsId) {

                productFound = await plantModel.findById(item.plantsId);

                if (!productFound) {
                    return res.status(404).json({
                        message: "Plant no encontrada"
                    });
                }

                subtotal = productFound.price * item.quantity;

                newProducts.push({
                    plantsId: item.plantsId,
                    quantity: item.quantity,
                    subtotal
                });

            }

            total += subtotal;
        }

        cart.products = newProducts;
        cart.total = total;
        cart.status = status || cart.status;

        await cart.save();

        return res.status(200).json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

cartController.deleteCart = async (req, res) => {
    try {

        const { id } = req.params;

        const cart = await cartModel.findById(id);

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        await cartModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Cart deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export default cartController;