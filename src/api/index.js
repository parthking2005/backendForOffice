import { router } from "./routes/auth.js";
import { todoRouter } from "./routes/todo.js";
import express from "express";

const authRoute = express.Router()


authRoute.use("/user", router);
authRoute.use("/todo", todoRouter);

export {authRoute};