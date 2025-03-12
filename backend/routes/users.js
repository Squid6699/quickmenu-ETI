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

    const query = "SELECT U.id, U.username AS username, U.name AS name, R.name AS ROL_NAME FROM users U INNER JOIN role R ON U.roleId = R.id";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "USERS RETRIEVED", data: result});
    })
})

routerAddUsers.post("/addUsers", async (req, res) => {
    const { username, name, password, roleId } = req.body;

    if (!username || !name || !password || !roleId){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "INSERT INTO users (username, name, password, roleId) VALUES (?, ?, ?, ?)";
    db.query(query, [username, name, password, roleId], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }
        return res.status(200).json({success: true, msg: "USER ADDED"});
    })
})

routerUpdateUsers.put("/updateUsers", async (req, res) => {
    const { id, username, name, password, roleId } = req.body;

    if (!id || !username || !name || !password || !roleId){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "UPDATE users SET username = ?, name = ?, password = ?, roleId = ? WHERE id = ?";
    db.query(query, [username, name, password, roleId, id], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }

        if (result.affectedRows === 0){
            return res.status(404).json({success: false, msg: "USER NOT FOUND"});
        }

        return res.status(200).json({success: true, msg: "USER UPDATED"});
    })
})

routerDeleteUsers.delete("/deleteUsers", async (req, res) => {
    const { id } = req.body;

    if (!id){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => { 
        if (err) {
            return res.status(500).json({msg: "INTERNAL SERVER ERROR"});
        }

        if (result.affectedRows === 0){
            return res.status(404).json({success: false, msg: "USER NOT FOUND"});
        }

        return res.status(200).json({success: true, msg: "USER DELETED"});
    })
})