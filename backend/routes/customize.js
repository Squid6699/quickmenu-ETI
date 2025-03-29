import express from "express";
import { db } from "../db.js";

export const routerGetCustomize = express.Router();
export const routerUpdateCustomize = express.Router();

routerUpdateCustomize.put("/updateCustomize", async (req, res) => {
    const { id, color } = req.body;

    const query = "UPDATE customize SET color = ? WHERE id = ?";

    db.execute(query, [color, id], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "CATEGORY NOT FOUND" });
        }
        res.status(200).json({ success: true, msg: "CATEGORY UPDATED" });
    });
});

routerGetCustomize.get("/getCustomize", async (req, res) => {
    
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM customize";

    db.execute(query, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
        }
        return res.status(200).json({ success: true, customize: result });
    });
});