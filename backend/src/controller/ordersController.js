import cartModel from "../models/cart.js";

// Estatus válidos para una orden en el panel de admin.
// Si necesitas agregar/quitar alguno, este es el único lugar que hay que tocar.
const VALID_STATUSES = ["Pendiente", "Aceptado", "En proceso", "Completo", "Rechazado"];

// array de funciones
const ordersController = {};

// Arma un código de orden legible a partir del _id de Mongo (no se guarda en BD,
// se calcula al vuelo, por eso no requiere tocar el modelo de carrito).
const buildOrderCode = (id) => `#OR-${id.toString().slice(-6).toUpperCase()}`;

//GET /api/orders
// Lista todas las órdenes (carritos ya con clientId y productos) en el formato
// que espera la tabla de Ordenes.jsx en el frontend.
ordersController.getAll = async (req, res) => {
    try {
        const carts = await cartModel.find()
            .populate("clientId", "name lastName email")
            .populate("products.postId", "name price image")
            .populate("products.candleId", "name price image")
            .populate("products.plantsId", "name price image")
            .sort({ createdAt: -1 });

        // Para calcular "Cliente nuevo" vs "Cliente recurrente" necesitamos saber
        // cuántas órdenes previas tiene cada cliente.
        const ordersPerClient = {};

        const response = carts.map(cart => {
            const clientKey = cart.clientId?._id?.toString();
            ordersPerClient[clientKey] = (ordersPerClient[clientKey] || 0) + 1;

            const items = cart.products.map(item => {
                const product = item.postId || item.candleId || item.plantsId;
                return {
                    product,
                    quantity: item.quantity,
                    subtotal: item.subtotal
                };
            });

            const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
            const firstProductName = items[0]?.product?.name || "Producto eliminado";
            const productLabel = items.length > 1
                ? `${firstProductName} +${items.length - 1}`
                : firstProductName;

            return {
                _id: cart._id,
                orderCode: buildOrderCode(cart._id),
                client: cart.clientId
                    ? { _id: cart.clientId._id, name: `${cart.clientId.name || ""} ${cart.clientId.lastName || ""}`.trim(), email: cart.clientId.email }
                    : null,
                clientType: ordersPerClient[clientKey] > 1 ? "Cliente recurrente" : "Cliente nuevo",
                product: productLabel,
                items: totalItems,
                total: cart.total,
                status: cart.status || "Pendiente",
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt
            };
        });

        return res.status(200).json(response);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//PATCH /api/orders/:id/status
// El admin solo cambia el estatus de la orden (Pendiente/Aceptado/En proceso/Completo/Rechazado).
// No usa el PUT genérico de cartController porque ese exige reenviar todo el arreglo de products.
ordersController.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                message: `Estatus inválido. Debe ser uno de: ${VALID_STATUSES.join(", ")}`
            });
        }

        const order = await cartModel.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//DELETE /api/orders/:id
ordersController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await cartModel.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await cartModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default ordersController;
