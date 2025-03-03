import express from "express";
import { db } from "../db.js";
import  jwt  from "jsonwebtoken";

export const routerLogin = express.Router();
export const routerRegister = express.Router();

routerLogin.post("/login", async (req, res) => {

    const {username, password} = req.body;
    

    if (!username || !password){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "SELECT u.username AS username, u.name AS name, u.roleId AS ROLE_ID, r.permissions AS ROL_PERMISSIONS FROM users U INNER JOIN role R ON U.roleId = R.id WHERE username = ? AND BINARY password = ?";

    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        if (result.length === 0){
            return res.status(401).json({success: false, msg: "LOGIN ERROR"});
        }
        const token = jwt.sign({username: result[0].username, name: result[0].name, roleId: result[0].roleId}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN});
        return res.status(200).json({success: true, msg: "LOGIN SUCCESSFUL", token: token, name: result[0].name, username: result[0].username, roleId: result[0].ROLE_ID, permissions: result[0].ROL_PERMISSIONS});
    });
});

routerRegister.post("/register", async (req, res) => {
    const {username, password, name, roleId} = req.body;

    if (!username || !password || !name || !roleId){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "INSERT INTO users (username, password, name, roleId) VALUES (? ? ? ?)";
    db.query(query, [username, password, name, roleId], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        if (result.affectedRows === 0){
            return res.status(401).json({success: false, msg: "REGISTER ERROR"});
        }
        return res.status(200).json({success: true, msg: "REGISTER SUCCESSFUL"});
    })
})