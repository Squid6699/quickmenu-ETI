import mysql from "mysql2";

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB
});