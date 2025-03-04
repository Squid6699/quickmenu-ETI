import express from "express";
import { db } from "../db.js";

export const routerGetOrders = express.Router();

routerGetOrders.get("/getOrders", (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT OD.orderId, OD.menuId, OD.quantity, OD.price, OD.status AS FOOD_STATUS, OD.comments, N.name, N.description, O.status AS ORDER_STATUS, W.username AS WAITRESS, T.username AS 'TABLE', O.total AS 'TOTAL' "+
    "FROM orderdetails OD "+
    "INNER JOIN orders O ON OD.orderID = O.id " +
    "INNER JOIN menu N ON OD.menuID = N.id " +
    "INNER JOIN users W ON O.idWaitress = W.id " +
    "INNER JOIN users T ON O.idTable = T.id";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "ORDERS RETRIEVED", data: result});
    })
})