import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

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
