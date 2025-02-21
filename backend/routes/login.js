import express from "express";
import { db } from "../db.js";

export const routerLogin = express.Router();

routerLogin.post("/login", (req, res) => {

    const {username, password} = req.body;

    if (!username || !password){
        return res.status(400).json({msg: "MISSING DATA"});
    }

    const query = "SELECT username, password FROM users WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "INTERAL SERVER ERROR"});
        }
        if (result.length === 0){
            return res.status(401).json({success: false, msg: "LOGIN ERROR"});
        }
        
        return res.status(200).json({success: true, msg: "LOGIN SUCCESSFUL"});
    })
})