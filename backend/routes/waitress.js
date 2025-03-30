import express from "express";
import { db } from "../db.js";

export const routerGetAssignedWaitress = express.Router();

routerGetAssignedWaitress.get("/getAssignedWaitress", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "SELECT U.name AS userName, AT.idUser AS idWaitressAssigned FROM assigned_tables AT INNER JOIN users U ON U.id = AT.idUser WHERE AT.idTable = ?";

    try {
        const [result] = await db.execute(query, [id]);
        if (result.length === 0) {
            return res.status(404).json({ success: false, msg: "ASSIGNED WAITRESS NOT FOUND" });
        }
        return res.status(200).json({ success: true, msg: "ASSIGNED WAITRESS RETRIEVED", data: result[0] });
    } catch (error) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
})
