
// const {connectDB} = require(' src\\config\\index.js');
// const {app} = require('src\\server.js');
import { isMapIterator } from "util/types";
import connectDB from "./database/config/index.js";
import app from "./server.js";
import { ApiError } from "./helper/Error.js";
const port = process.env.SERVER_PORT || 6001;

connectDB()
    .then(() => {
        try {
            app.on("error", (err) => {
                console.log("There was something problem in connectDB: ", err);

            })
            app.listen(port, () => {
                console.log(`server started on port http://localhost:${port}`);
            })
        } catch (error) {
            ApiError(error);
        }
    })

