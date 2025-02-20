import express from "express";
import dotenv from "dotenv";
import { middleware } from "./middleware/cors.js";


if (process.env.NODE_ENV === 'production') {
    dotenv.config({path: "./.env.production"});
    console.log('Cargando variables de producción');
} else {
    dotenv.config({path: "./.env.development"});
    console.log('Cargando variables de desarrollo');
}

const app = express();
app.use(middleware);



app.listen(process.env.PUERTO, () => {
    console.log("Conectado backend");
});