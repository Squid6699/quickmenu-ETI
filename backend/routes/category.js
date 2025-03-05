import express from "express";
import { db } from "../db.js";

export const routerGetCategory = express.Router();
export const routerUpdateCategory = express.Router();
export const routerDeleteCategory = express.Router();
export const routerAddCategory = express.Router();


routerGetCategory.get("/getCategory", (req, res) => {

    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM Category";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
        }
        return res.status(200).json({ success: true, categories: result });
    })
})

routerUpdateCategory.put("/updateCategory", (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "UPDATE Category SET name = ?  WHERE id = ?"

    db.query(query, [id, name], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
        }
        res.status(200).json({ success: true, msg: "CATEGORY UPDATED" });
    })
})

routerDeleteCategory.delete("/deleteCategory", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "DELETE FROM Category WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, msg: "CATEGORY NOT FOUND" });
        }

        return res.status(200).json({ success: true, msg: "CATEGORY DELETED" });
    })

})

routerAddCategory.post("/addCategory", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: "MISSING DATA" });
    }

    const query = "INSERT INTO Category (name) VALUES (?)";
    db.query(query, [name], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
        }
        return res.status(200).json({ success: true, msg: "CATEGORY ADDED" });
    })
})
