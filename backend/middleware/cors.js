import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

if (process.env.NODE_ENV === 'production') {
    dotenv.config({path: "./.env.production"});
} else {
    dotenv.config({path: "./.env.development"});
}

export const middleware = express.Router();
const optionCors = {
    origin: process.env.HOST,
    credentials: true
}

middleware.use(cors(optionCors));
middleware.use(express.json());

// Middleware para rutas protegidas
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No autorizado' });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
};