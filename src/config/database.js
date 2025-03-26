import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();


const con = new Client({
    host: process.env.HOST_DOMAIN,
    user: process.env.DATABASE_TYPE,
    port: process.env.PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})


export {con}