import express from "express";
import { db } from "../db.js";

export const routerGetOrders = express.Router();

routerGetOrders.get("/getOrders", (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT OD.orderId, OD.menuId, OD.quantity, OD.price, OD.status, OD.comments " +
    "FROM orderdetails OD "+
    "INNER JOIN orders O ON OD.orderID = O.orderID " +
    "INNER JOIN menu N ON OD.menuID = N.menuID ";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "ORDERS RETRIEVED", data: result});
    })
})