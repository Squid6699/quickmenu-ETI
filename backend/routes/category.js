import express from "express";
import { db } from "../db.js";

export const routerGetCategory = express.Router();
export const routerUpdateCategory = express.Router();
export const routerDeleteCategory = express.Router();
export const routerAddCategory = express.Router();


routerGetCategory.get("/getCategory", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM Category";

    try {
        const [result] = await db.execute(query);

        return res.status(200).json({ success: true, categories: result });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerUpdateCategory.put("/updateCategory", async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "UPDATE Category SET name = ? WHERE id = ?";

    try {
        const [result] = await db.execute(query, [name, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "CATEGORY NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "CATEGORY UPDATED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});


routerDeleteCategory.delete("/deleteCategory", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "DELETE FROM Category WHERE id = ?";

    try {
        const [result] = await db.execute(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "CATEGORY NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "CATEGORY DELETED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR"});
    }
});


routerAddCategory.post("/addCategory", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "INSERT INTO Category (name) VALUES (?)";

    try {
        const [result] = await db.execute(query, [name]);

        return res.status(200).json({ success: true, msg: "CATEGORY ADDED" });
    } catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
});
