import express from "express"

//import rutas de clientes
import registerClientRoutes from "./src/routes/registerClient.js"
import loginClientRoutes from "./src/routes/loginClient.js"
import recoveryPasswordClientRoutes from "./src/routes/recoveryPasswordClient.js"
import postRoutes from "./src/routes/post.js"
import clientRoutes from "./src/routes/client.js"
import plantsRoutes from "./src/routes/plants.js"
//import rutas de admin
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import recoveryPasswordAdminRoutes from "./src/routes/recoveryPasswordAdmin.js"

//import rutas de candles
import candlesRoutes from "./src/routes/candles.js"

import servicesRoutes from "./src/routes/services.js"
import wishListRoutes from "./src/routes/wishlist.js"
import logoutRoutes from "./src/routes/logout.js"
import offersRoutes from "./src/routes/offers.js"

//import rutas de carrito
import cartRoutes from "./src/routes/cart.js"

//import rutas de configuración
import configRoutes from "./src/routes/config.js"

import cors from "cors"


import cookieParser from "cookie-parser"

//creo una constante app que es una instancia de express, esto me permite usar todas las funcionalidades de express para crear mi servidor y manejar rutas, middlewares, etc.

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true
}));

app.use(cookieParser());

//para que la api acepte json
app.use(express.json());

//rutas

//rutas de clientes
app.use("/api/registerClient", registerClientRoutes);
app.use("/api/loginClient", loginClientRoutes);
app.use("/api/recoveryPasswordClient", recoveryPasswordClientRoutes);
app.use("/api/clients", clientRoutes);

//rutas de admin
app.use("/api/registerAdmin", registerAdminRoutes);
app.use("/api/loginAdmin", loginAdminRoutes);
app.use("/api/recoveryPasswordAdmin", recoveryPasswordAdminRoutes);

//rutas de candles
app.use("/api/candles", candlesRoutes);

//rutas de post(macetas)
app.use("/api/post", postRoutes);

//rutas de plantas
app.use("/api/plants", plantsRoutes);
//ruta de servicios
app.use("/api/services", servicesRoutes);
//ruta de lista de deseos
app.use("/api/wishlist", wishListRoutes);
app.use("/api/logout", logoutRoutes);

//ruta de ofertas
app.use("/api/offers", offersRoutes);

//ruta de carrito
app.use("/api/cart", cartRoutes);

//ruta de configuración
app.use("/api/config", configRoutes);

export default app;