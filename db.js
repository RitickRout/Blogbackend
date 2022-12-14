import mysql from 'mysql'
import  dotenv from 'dotenv';
dotenv.config();


const hostname = process.env.HOST;
const username = process.env.UNAME
const pswd=process.env.PASSWORD
const dbms =process.env.DB

export const db = mysql.createConnection({
    host:hostname,
    user:username,
    password:pswd,
    database:dbms
})

