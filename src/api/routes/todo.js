import { Router } from "express";
import { getUserId } from "../../middleware/getUserId.js";
import { todocreate, tododelete, todoread, todoupdate } from "../controllers/todo.js";

const todoRouter = Router()

todoRouter.route("/").get(
    getUserId,
    todoread
)

todoRouter.route("/add").post(
    getUserId,
    todocreate
)

todoRouter.route("/update/:todo_id").put(
    getUserId,
    todoupdate
)

todoRouter.route("/delete/:todo_id").delete(
    getUserId,
    tododelete
)

export {todoRouter}