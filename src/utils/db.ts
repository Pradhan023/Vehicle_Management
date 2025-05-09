import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,                              
  port: Number(process.env.USER_PORT),                     
  user: process.env.DB_USER,                              
  password: process.env.DB_PASSWORD,                     
  database: process.env.DB_NAME,                         
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, 'certs/ca.pem'))
  },
  connectTimeout: 30000,   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});