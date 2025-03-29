import express from "express";
import { db } from "../db.js";

export const routerGetCustomize = express.Router();
export const routerUpdateCustomize = express.Router();

routerUpdateCustomize.put("/updateCustomize", async (req, res) => {
    const { id, color } = req.body;

    if (!id || !color) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "UPDATE customize SET color = ? WHERE id = ?";

    try {
        const [result] = await db.execute(query, [color, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "CUSTOMIZE NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "CUSTOMIZE UPDATED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerGetCustomize.get("/getCustomize", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM customize";

    try {
        const [result] = await db.execute(query);

        return res.status(200).json({ success: true, customize: result });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});
