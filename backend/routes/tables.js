import express from 'express';
import { db } from "../db.js";

export const routerGetAllTables = express.Router();

routerGetAllTables.get("/getAllTables", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    try {
        const query = `
            SELECT u.id AS id, u.username AS username, u.name AS "table"
            FROM Users u
            JOIN Role r ON u.roleId = r.id
            WHERE JSON_EXTRACT(r.permissions, '$."Ser Asignado"') = TRUE;
        `;


        const [result] = await db.query(query);

        if (result.length === 0) {
            return res.status(404).json({ msg: "NO TABLES FOUND" });
        }

        return res.status(200).json({ success: true, msg: "TABLES RETRIEVED", data: result });

    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
})
