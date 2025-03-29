import express from "express";
import { db } from "../db.js";

export const routerGetUsers = express.Router();
export const routerAddUsers = express.Router();
export const routerDeleteUsers = express.Router();
export const routerUpdateUsers = express.Router();

routerGetUsers.get("/getUsers", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = `
        SELECT 
            U.id, 
            U.username AS username, 
            U.name AS name, 
            R.name AS ROL_NAME, 
            U.password AS password 
        FROM users U 
        INNER JOIN role R ON U.roleId = R.id
    `;

    try {
        const [result] = await db.execute(query);
        return res.status(200).json({ success: true, msg: "USERS RETRIEVED", data: result });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR"});
    }
});

routerAddUsers.post("/addUsers", async (req, res) => {
    const { username, name, password, roleId } = req.body;

    if (!username || !name || !password || !roleId) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "INSERT INTO users (username, name, password, roleId) VALUES (?, ?, ?, ?)";

    try {
        const [result] = await db.execute(query, [username, name, password, roleId]);

        return res.status(200).json({ success: true, msg: "USER ADDED", insertedId: result.insertId });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "INTERNAL SERVER ERROR" });
    }
});

routerUpdateUsers.put("/updateUsers", async (req, res) => {
    const { id, username, name, password, roleId } = req.body;

    if (!id || !username || !name || !password || !roleId) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "UPDATE users SET username = ?, name = ?, password = ?, roleId = ? WHERE id = ?";

    try {
        const [result] = await db.execute(query, [username, name, password, roleId, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "USER NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "USER UPDATED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerDeleteUsers.delete("/deleteUsers", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "DELETE FROM users WHERE id = ?";

    try {
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "USER NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "USER DELETED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR"});
    }
});
