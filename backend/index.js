import express from "express";
import dotenv from "dotenv";
import { middleware } from "./middleware/cors.js";
import { routerLogin, routerRegister } from "./routes/login.js";
import { routerAddRoles, routerDeleteRoles, routerGetRoles, routerUpdateRoles } from "./routes/role.js";
import { routerConfirmOrder, routerGetOrders } from "./routes/orders.js";
import { routerAddMenu, routerDeleteMenu, routerGetMenu, routerUpdateMenu } from "./routes/menu.js";
import { routerAddCategory, routerDeleteCategory, routerGetCategory, routerUpdateCategory } from "./routes/category.js";
import { routerGetCustomize, routerUpdateCustomize } from "./routes/customize.js";
import { routerAddUsers, routerDeleteUsers, routerGetUsers, routerUpdateUsers } from "./routes/users.js";
import { routerGetAssignedTables, routerGetAssignedWaitress } from "./routes/waitress.js";


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
app.use("/api/", routerUpdateRoles);

app.use("/api/", routerGetOrders);
app.use("/api/", routerConfirmOrder);

app.use("/api/", routerGetMenu);
app.use("/api/", routerUpdateMenu);
app.use("/api/", routerDeleteMenu);
app.use("/api/", routerAddMenu);

app.use("/api/", routerGetCategory);
app.use("/api/", routerUpdateCategory);
app.use("/api/", routerDeleteCategory);
app.use("/api/", routerAddCategory);

app.use("/api/", routerUpdateCustomize);
app.use("/api/", routerGetCustomize);

app.use("/api/", routerGetUsers);
app.use("/api/", routerAddUsers);
app.use("/api/", routerDeleteUsers);
app.use("/api/", routerUpdateUsers);

app.use("/api/", routerGetAssignedTables);
app.use("/api/", routerGetAssignedWaitress);



app.listen(process.env.PUERTO, () => {
    console.log("Conectado backend");
});