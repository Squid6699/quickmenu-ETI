import express from "express";
import { db } from "../db.js";

export const routerAddRoles = express.Router();
export const routerGetRoles = express.Router();
export const routerDeleteRoles = express.Router();
export const routerUpdateRoles = express.Router();


routerAddRoles.post("/addRoles", async (req, res) => {
    const { name } = req.body;

    if (!name){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "INSERT INTO role (name) VALUES (?)";
    db.query(query, [name], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "ROLE ADDED"});
    })
})

routerGetRoles.get("/getRoles", async (req, res) => {
    
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM role";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "ROLES RETRIEVED", data: result});
    })
})

routerDeleteRoles.delete("/deleteRoles", async (req, res) => {
    const { id } = req.body;

    if (!id){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "DELETE FROM role WHERE id = ?";
    db.query(query, [id], (err, result) => { 
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }

        if (result.affectedRows === 0){
            return res.status(404).json({success: false, msg: "ROLE NOT FOUND"});
        }

        return res.status(200).json({success: true, msg: "ROLE DELETED"});
    })
})

routerUpdateRoles.put("/updateRoles", async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "UPDATE role SET name = ? WHERE id = ?";

    db.query(query, [name, id], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        res.status(200).json({success: true, msg: "ROLE UPDATED"});
    })
})