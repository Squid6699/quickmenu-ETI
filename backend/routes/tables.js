//NO TERMINADO
import express from 'express';
import { db } from "../db.js";

export const routerGetAllTables = express.Router();

routerGetAllTables.get("/getAllTables", async (req, res) => {
    const customHeader = req.headers['x-frontend-header'];

    if (customHeader !== 'frontend') {
        return res.status(401).send('Unauthorized');
    }

    try{
        
    }catch (err) {
        return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
    }
})