import express from "express";
import { db } from "../db.js";

export const routerGetMenu = express.Router();
export const routerUpdateMenu = express.Router();
export const routerDeleteMenu = express.Router();
export const routerAddMenu = express.Router();

routerGetMenu.get("/getMenu", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT M.id AS idMenu, M.name AS NAME_MENU, M.price, M.description, C.name AS CATEGORY_NAME, M.available FROM menu M INNER JOIN category C ON M.idCategory = C.id WHERE M.available = 1";

    try {
        const [result] = await db.execute(query);

        return res.status(200).json({ success: true, msg: "MENU RETRIEVED", data: result });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerUpdateMenu.put("/updateMenu", async (req, res) => {
    const { id, name, price, description, idcategory, available } = req.body;

    if (!id || !name || !price || !description || !idcategory || available === undefined) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "UPDATE menu SET name = ?, price = ?, description = ?, idcategory = ?, available = ? WHERE id = ?";

    try {
        const [result] = await db.execute(query, [name, price, description, idcategory, available, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "MENU NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "MENU UPDATED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerDeleteMenu.delete("/deleteMenu", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "DELETE FROM menu WHERE id = ?";

    try {
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "MENU NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "MENU DELETED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR"});
    }
});


routerAddMenu.post("/addMenu", async (req, res) => {
    const { name, price, description, idcategory, available } = req.body;

    if (!name || !price || !description || !idcategory || available === undefined) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "INSERT INTO menu (name, price, description, idcategory, available) VALUES (?, ?, ?, ?, ?)";

    try {
        const [result] = await db.execute(query, [name, price, description, idcategory, available]);

        return res.status(200).json({ success: true, msg: "MENU ADDED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR"});
    }
});
