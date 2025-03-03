import express from "express";
import { db } from "../db.js";

export const routerGetMenu = express.Router();
export const routerUpdateMenu = express.Router();
export const routerDeleteMenu = express.Router();
export const routerAddMenu = express.Router();

routerGetMenu.get("/getMenu", (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    const query = "SELECT * FROM menu";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "MENU RETRIEVED", data: result});
    })
})

routerUpdateMenu.put("/updateMenu", (req, res) => {
    const {id,name,price} = req.body;
    if (!id || !name || !price) {
        return res.status(400).json({msg:"MISSING DATA"});
    }

    const query = "UPDATE menu SET name = ? ,price = ? WHERE id = ?"

    db.query(query, [name, id], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        res.status(200).json({success: true, msg: "MENU UPDATED"});
    })

})

routerDeleteMenu.delete("/deleteMenu", (req, res) => {
    const { id } = req.body;

    if (!id){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "DELETE FROM role WHERE id = ?";
    db.query(query, [id], (err, result) => { 
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }

        if (result.affectedRows === 0){
            return res.status(404).json({success: false, msg: "MENU NOT FOUND"});
        }

        return res.status(200).json({success: true, msg: "MENU DELETED"});
    })

})

routerAddMenu.post("/addMenu", (req, res) => {
    const { name,price } = req.body;

    if (!name || !price){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "INSERT INTO menu (name,price) VALUES (?,?)";
    db.query(query, [name,price], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "MENU ADDED"});
    })
})