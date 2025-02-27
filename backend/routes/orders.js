import express from "express";

export const routerGetOrders = express.Router();

routerGetOrders.get("/getOrders", (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT OD.orderId, OD.menuId, OD.quantity, OD.price, OD.status, OD.comments FROM orderdetails OD " +
    "INNER JOIN orders O ON OD.orderID = P.orderID"+
    "INNER JOIN menu N ON OD.menuID = N.menuID"
})