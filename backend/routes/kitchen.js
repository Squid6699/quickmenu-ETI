import express from "express";
import { db } from "../db.js";

// OBTENER TODAS LAS ORDENES DONDE SE ESTADO SEA EN PREPARACION O PENDIENTE PARA MOSTRARLAS EN LA COCINA
export const routerGetOrdersKitchen = express.Router();
routerGetOrdersKitchen.get("/getOrdersKitchen", async (req, res) => {
    const customHeader = req.headers["x-frontend-header"];

    if (customHeader !== "frontend") {
        return res.status(401).send("Unauthorized");
    }

    const query = "SELECT OD.id AS id, OD.orderId AS orderId, OD.menuId AS menuId, M.name AS menuName, M.description AS menuDescription, OD.quantity AS quantity, OD.price AS price, OD.`status` AS 'status', OD.comments AS comments, U.username AS 'table' FROM orderdetails OD INNER JOIN menu M ON OD.menuId = M.id INNER JOIN orders O ON OD.orderId = O.id INNER JOIN users U ON U.id = O.idTable WHERE OD.`status` != 'Entregado' AND OD.`status` != 'Pagado' ORDER BY OD.orderId DESC";

    try {
        const [result] = await db.execute(query);
        return res.status(200).json({ success: true, msg: "ORDERS RETRIEVED", data: result });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR" });
    }
});

// ACTUALIZAR EL ESTADO DE UNA ORDEN
export const routerUpdateOrderKitchen = express.Router();
routerUpdateOrderKitchen.put("/updateOrderKitchen", async (req, res) => {
    const customHeader = req.headers["x-frontend-header"];

    if (customHeader !== "frontend") {
        return res.status(401).send("Unauthorized");
    }

    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ success: false, msg: "BAD REQUEST" });
    }

    const query = "UPDATE orderdetails SET `status` = ? WHERE id = ?";
    try {
        await db.execute(query, [status, id]);
        return res.status(200).json({ success: true, msg: "ORDER UPDATED" });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR" });
    }
});