import express from "express";
import { router } from "./api/routes/auth.route.js";

const app = express();

app.get("/",async(req, res) => {
    console.log("hello world");
    res.send("Hello")
})

app.use("/api/v1/user", router)

export default app;