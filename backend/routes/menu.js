import express from "express";
import { db } from "../db.js";

export const routerGetMenu = express.Router();
export const routerUpdateMenu = express.Router();
export const routerDeleteMenu = express.Router();
export const routerAddMenu = express.Router();

routerGetMenu.get("/getMenu", (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM menu";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "MENU RETRIEVED", data: result});
    })
})