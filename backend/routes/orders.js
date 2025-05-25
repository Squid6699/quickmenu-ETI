import express from "express";
import { db } from "../db.js";

export const routerGetOrders = express.Router();
export const routerConfirmOrder = express.Router();
export const routerGetAssignedWaitress = express.Router();
export const routerGetOrdersReceived = express.Router();

routerGetOrders.get("/getOrders", async (req, res) => {
    const { q } = req.query;
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = `
        SELECT
            OD.id AS idOrderDetails,
            OD.orderId AS idOrder, 
            OD.menuId AS menuId, 
            OD.quantity AS menuQuantity, 
            OD.price AS FOOD_TOTAL, 
            OD.status AS FOOD_STATUS, 
            OD.comments AS FOOD_COMMENTS, 
            N.name AS menuName, 
            N.description AS menuDescription, 
            O.status AS ORDER_STATUS, 
            W.username AS WAITRESS, 
            T.username AS 'TABLE', 
            O.total AS 'TOTAL'
            FROM orderdetails OD
            INNER JOIN orders O ON OD.orderID = O.id
            INNER JOIN menu N ON OD.menuID = N.id
            LEFT JOIN users W ON O.idWaitress = W.id
            INNER JOIN users T ON O.idTable = T.id
        WHERE idTable = ? AND O.status != 'Pagado' LIMIT 1`;

    try {
        const [result] = await db.execute(query, [q]);

        return res.status(200).json({ success: true, msg: "ORDERS RETRIEVED", data: result });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerConfirmOrder.post("/confirmOrder", async (req, res) => {
    const { idTable, idWaitress, orders } = req.body;

    const waitressId = idWaitress !== undefined ? idWaitress : null;

    const total = orders.reduce((acc, order) =>
        acc + parseFloat(order.quantity) * parseFloat(order.price), 0
    );

    if (!total || !idTable || !orders) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    try {

        // 1️⃣ Buscar si hay una orden en servicio (NO pagada) para esa mesa
        const [existingOrder] = await db.execute(
            "SELECT id FROM orders WHERE idTable = ? AND status != 'pagado' LIMIT 1",
            [idTable]
        );

        let orderId;

        if (existingOrder.length > 0) {
            // 2️⃣ Si hay una orden en servicio, usar su ID
            orderId = existingOrder[0].id;
        } else {
            // 3️⃣ Si no hay orden en servicio, crear una nueva
            const [orderResult] = await db.execute(
                "INSERT INTO orders (total, idTable, idWaitress) VALUES (?, ?, ?)",
                [total, idTable, waitressId]
            );
            orderId = orderResult.insertId;
        }


        // 4️⃣ Agregar los nuevos platillos a OrderDetails
        const orderDetailsPromises = orders.map((order) =>
            db.execute(
                "INSERT INTO OrderDetails (orderId, menuId, quantity, price, comments) VALUES (?, ?, ?, ?, ?)",
                [orderId, order.menuId, order.quantity, order.price, order.comments || null]
            )
        );

        await Promise.all(orderDetailsPromises);

        res.json({ success: true, msg: "ORDER UPDATED SUCCESSFULLY" });
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});

routerGetAssignedWaitress.get("/getAssignedWaitress", async (req, res) => {
    const { id } = req.query;
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = `
        SELECT U.id AS idWaitress, U.username AS username
        FROM assigned_tables AT
        INNER JOIN users U ON U.id = AT.idUser
        WHERE AT.idTable = ?
    `;

    try {
        const [result] = await db.execute(query, [id]);

        if (result.length === 0) {
            return res.status(404).json({ msg: "WAITRESS NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "WAITRESS RETRIEVED", data: result[0] });

    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }

})

routerGetOrdersReceived.get("/getOrdersReceived", async (req, res) => {
    const { q } = req.query;
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = `
        SELECT
            OD.id AS idOrderDetails,
            OD.orderId AS idOrder, 
            OD.menuId AS menuId, 
            OD.quantity AS menuQuantity, 
            OD.price AS FOOD_TOTAL, 
            OD.status AS FOOD_STATUS, 
            OD.comments AS FOOD_COMMENTS, 
            N.name AS menuName, 
            N.description AS menuDescription, 
            O.status AS ORDER_STATUS, 
            W.username AS WAITRESS, 
            T.username AS 'TABLE', 
            O.total AS 'TOTAL'
            FROM orderdetails OD
            INNER JOIN orders O ON OD.orderID = O.id
            INNER JOIN menu N ON OD.menuID = N.id
            LEFT JOIN users W ON O.idWaitress = W.id
            INNER JOIN users T ON O.idTable = T.id
        WHERE idTable = ? AND OD.status = 'Entregado';`;

    try {
        const [result] = await db.execute(query, [q]);

        return res.status(200).json({ success: true, msg: "ORDERS RETRIEVED", data: result });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
})