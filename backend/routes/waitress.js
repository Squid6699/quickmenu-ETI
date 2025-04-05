import express from "express";
import { db } from "../db.js";

export const routerGetAssignedWaitress = express.Router();
export const routerGetAssignedTables = express.Router();

routerGetAssignedTables.get("/getAssignedTables", async (req, res) => {

    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = `SELECT 
    AT.idUser AS idWaitress,
    U.username AS Waitress,
    GROUP_CONCAT(T.username ORDER BY T.username SEPARATOR ', ') AS Tables
    FROM assigned_tables AT
    INNER JOIN users U ON U.id = AT.idUser
    INNER JOIN users T ON T.id = AT.idTable
    GROUP BY AT.idUser, U.username`;

    try {
        const [result] = await db.execute(query);
        if (result.length === 0) {
            return res.status(404).json({ success: false, msg: "ASSIGNED TABLES NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "ASSIGNED TABLES RETRIEVED", data: result });
    } catch (error) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }

});


routerGetAssignedWaitress.get("/getAssignedWaitress", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = `SELECT 
    AT.idUser AS idWaitress,
    U.username AS Waitress,
    GROUP_CONCAT(T.id ORDER BY T.id SEPARATOR ', ') AS TableIDs,
    GROUP_CONCAT(T.username ORDER BY T.username SEPARATOR ', ') AS Tables
    FROM assigned_tables AT
    INNER JOIN users U ON U.id = AT.idUser
    INNER JOIN users T ON T.id = AT.idTable
    WHERE AT.idUser = 3
    GROUP BY AT.idUser, U.username;
    `;

    try {
        const [result] = await db.execute(query, [id]);
        if (result.length === 0) {
            return res.status(404).json({ success: false, msg: "ASSIGNED WAITRESS NOT FOUND" });
        }
        return res.status(200).json({ success: true, msg: "ASSIGNED WAITRESS RETRIEVED", data: result });
    } catch (error) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
})
