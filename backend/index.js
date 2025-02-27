import express from "express";
import dotenv from "dotenv";
import { middleware } from "./middleware/cors.js";
import { routerLogin, routerRegister } from "./routes/login.js";
import { routerAddRoles, routerDeleteRoles, routerGetRoles } from "./routes/role.js";
import { routerGetOrders } from "./routes/orders.js";


if (process.env.NODE_ENV === 'production') {
    dotenv.config({path: "./.env.production"});
    console.log('Cargando variables de producción');
} else {
    dotenv.config({path: "./.env.development"});
    console.log('Cargando variables de desarrollo');
}

const app = express();
app.use(middleware);

app.use("/api/auth/", routerLogin);
app.use("/api/auth/", routerRegister);

app.use("/api/", routerAddRoles);
app.use("/api/", routerGetRoles);
app.use("/api/", routerDeleteRoles);

app.use("/api/", routerGetOrders);




app.listen(process.env.PUERTO, () => {
    console.log("Conectado backend");
});