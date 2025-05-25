import express from "express";
import dotenv from "dotenv";
import { middleware } from "./middleware/cors.js";
import { routerLogin, routerRegister } from "./routes/login.js";
import { routerAddRoles, routerDeleteRoles, routerGetRoles, routerUpdateRoles } from "./routes/role.js";
import { routerConfirmOrder, routerGetAssignedWaitress, routerGetOrders, routerGetOrdersReceived } from "./routes/orders.js";
import { routerAddMenu, routerDeleteMenu, routerGetMenu, routerUpdateMenu } from "./routes/menu.js";
import { routerAddCategory, routerDeleteCategory, routerGetCategory, routerUpdateCategory } from "./routes/category.js";
import { routerGetCustomize, routerUpdateCustomize } from "./routes/customize.js";
import { routerAddUsers, routerDeleteUsers, routerGetUsers, routerUpdateUsers } from "./routes/users.js";
import { routerAssignedTableAdd, routerAssignedTableDelete, routerAssignedTableUpdate, routerGetAssignedTables, routerGetAssignedTablesWaitress } from "./routes/waitress.js";
import { routerGetAllTables } from "./routes/tables.js";
import { routerGetOrdersKitchen, routerUpdateOrderKitchen } from "./routes/kitchen.js";


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
app.use("/api/", routerGetAssignedWaitress);
app.use("/api/", routerGetOrdersReceived);

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

app.use("/api/", routerGetAssignedTablesWaitress);
app.use("/api/", routerGetAssignedTables);
app.use("/api/", routerAssignedTableAdd);
app.use("/api/", routerAssignedTableDelete);

app.use("/api/", routerGetAllTables);

app.use("/api/", routerGetOrdersKitchen);
app.use("/api/", routerUpdateOrderKitchen);





app.listen(process.env.PUERTO, () => {
    console.log("Conectado backend");
});