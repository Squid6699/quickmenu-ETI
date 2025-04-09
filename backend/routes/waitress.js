import express from "express";
import { db } from "../db.js";

export const routerGetAssignedTablesWaitress = express.Router();
export const routerGetAssignedTables = express.Router();
export const routerAssignedTableAdd = express.Router();
export const routerAssignedTableUpdate = express.Router();
export const routerAssignedTableDelete = express.Router();

routerAssignedTableDelete.delete("/assignedTableDelete", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, msg: "MISSING DATA" });
    }

    const ids = id.map(item => item.id ?? item);
    const placeholders = ids.map(() => '?').join(',');

    const query = `DELETE FROM assigned_tables WHERE id IN (${placeholders})`;

    try {
        const [result] = await db.execute(query, ids);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "NO ASSIGNED TABLES FOUND" });
        }
        return res.status(200).json({ success: true, msg: `${result.affectedRows} ASSIGNED TABLE(S) DELETED` });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR" });
    }
});

routerAssignedTableUpdate.put("/assignedTableUpdate", async (req, res) => {

    const { id, idUser, idTable } = req.body;

    if (!id || !idUser || !idTable) {
        return res.status(400).json({ success: false, msg: "MISSING DATA" });
    }

    const query = `UPDATE assigned_tables SET idUser = ?, idTable = ? WHERE id = ?`;

    try {
        const [result] = await db.execute(query, [idUser, idTable, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "ASSIGNED TABLE NOT FOUND" });
        }
        return res.status(200).json({ success: true, msg: "ASSIGNED TABLE UPDATED" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, msg: "ASSIGNED TABLE ALREADY EXISTS" });
        }
        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR" });
    }

});

routerAssignedTableAdd.post("/assignedTableAdd", async (req, res) => {

    const { idUser, idTable } = req.body;

    const query = `INSERT INTO assigned_tables (idUser, idTable) VALUES (?, ?)`;

    try {
        const [result] = await db.execute(query, [idUser, idTable]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "ASSIGNED TABLE NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "ASSIGNED TABLE ADDED" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, msg: "ASSIGNED TABLE ALREADY EXISTS" });
        }

        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR" });
    }

});

routerGetAssignedTablesWaitress.get("/getAssignedTablesWaitress", async (req, res) => {
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
    CONCAT(
        '[', 
        GROUP_CONCAT(
            CONCAT('{ "id": ', T.id, ', "table": "', T.username, '" }')
            ORDER BY T.id
            SEPARATOR ', '
        ), 
        ']'
    ) AS Tables
    FROM assigned_tables AT
    INNER JOIN users U ON U.id = AT.idUser
    INNER JOIN users T ON T.id = AT.idTable
    WHERE AT.idUser = ?
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
});

routerGetAssignedTables.get("/getAssignedTables", async (req, res) => {

    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = `SELECT
	CONCAT(
        '[', 
        GROUP_CONCAT(
            CONCAT('{ "id": ', AT.id, ' }')
            ORDER BY T.id
            SEPARATOR ', '
        ), 
        ']'
    ) AS ids,
    AT.idUser AS idWaitress,
    U.username AS Waitress,
    CONCAT(
        '[', 
        GROUP_CONCAT(
            CONCAT('{ "id": ', T.id, ', "table": "', T.username, '" }')
            ORDER BY T.id
            SEPARATOR ', '
        ), 
        ']'
    ) AS Tables
    FROM assigned_tables AT
    INNER JOIN users U ON U.id = AT.idUser
    INNER JOIN users T ON T.id = AT.idTable
    GROUP BY AT.idUser, U.username;
    `;

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




