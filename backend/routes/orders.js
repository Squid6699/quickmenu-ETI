import express from "express";
import { db } from "../db.js";

export const routerGetOrders = express.Router();
export const routerConfirmOrder = express.Router();

routerGetOrders.get("/getOrders", (req, res) => {
    const { idUser } = req.query;
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT OD.orderId AS idOrder, OD.menuId AS menuId, OD.quantity AS menuQuiality, OD.price AS FOOD_TOTAL, OD.status AS FOOD_STATUS, OD.comments AS FOOD_COMMENTS, N.name AS menuName, N.description AS menuDescription, O.status AS ORDER_STATUS, W.username AS WAITRESS, T.username AS 'TABLE', O.total AS 'TOTAL' " +
        "FROM orderdetails OD " +
        "INNER JOIN orders O ON OD.orderID = O.id " +
        "INNER JOIN menu N ON OD.menuID = N.id " +
        "INNER JOIN users W ON O.idWaitress = W.id " +
        "INNER JOIN users T ON O.idTable = T.id WHERE idTable = ?";

    db.execute(query, [idUser], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
        }
        return res.status(200).json({ success: true, msg: "ORDERS RETRIEVED", data: result });
    })
})

routerConfirmOrder.post("/confirmOrder", async (req, res) => {
    const { idTable, idWaitress, orders } = req.body;

    const total = orders.reduce((acc, order) =>
        acc + parseFloat(order.quantity) * parseFloat(order.price), 0
    );

    if (!total || !idTable || !orders) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    try {

        // 1️⃣ Buscar si hay una orden en servicio (NO pagada) para esa mesa
        const existingOrder = await db.execute(
            "SELECT id FROM orders WHERE idTable = ? AND status != 'pagado' LIMIT 1",
            [idTable]
        );

        console.log("Existing Order:", existingOrder);
        
        // let orderId;

        // if (existingOrder) {
        //     // 2️⃣ Si hay una orden en servicio, usar su ID
        //     orderId = existingOrder[0].id;
        // } else {
        //     // 3️⃣ Si no hay orden en servicio, crear una nueva
        //     const orderResult = await db.execute(
        //         "INSERT INTO Orders (total, idTable, idWaitress) VALUES (?, ?, ?)",
        //         [total, idTable, idWaitress]
        //     );
        //     orderId = orderResult.insertId;
        // }

        // // 4️⃣ Agregar los nuevos platillos a OrderDetails
        // const orderDetailsPromises = orders.map((order) =>
        //     db.execute(
        //         "INSERT INTO OrderDetails (orderId, menuId, quantity, price, comments) VALUES (?, ?, ?, ?, ?)",
        //         [orderId, order.menuId, order.quantity, order.price, order.comments || null]
        //     )
        // );

        // await Promise.all(orderDetailsPromises);

        // res.json({ success: true, msg: "ORDER UPDATED SUCCESSFULLY" });
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ msg: "INTERNAL SERVER ERROR"});
    }
});