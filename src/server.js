import express from "express";
// import { router } from "./api/routes/auth.route.js";
import { authRoute } from "./api/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/v1", authRoute)

export default app;



app.get("/",async(req, res) => {
    console.log("hello world");
    res.send("Hello")
})



// app.get("/test",async(req, res) => {
//     res.status(200).json({
//         users: [
//             {
//                 name: 'parth',
//                 email: 'parthkathrotya@gmail.com',
//                 password: 'parth2005$'
//             }
//         ]
//     })
// })