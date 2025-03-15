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


const connectDB = async () => {
    try {
        let connectDataBase = await con.connect();
        con.query('select * from backendTest;', (err, res) => {
            if (!err) {
                console.log(res.rows);
            } else {
                console.log(err.message);
            }
            console.log("connected to db ");
            con.end;
        })
    } catch (error) {
        console.log(error.message);
    }
}


// module.exports = {connectDB};

export default connectDB;

