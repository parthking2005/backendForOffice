import { Router } from "express";
import { getUserId } from "../../middleware/getUserId.js";
import { todocreate, tododelete, todoread, todoupdate } from "../controllers/todo.js";

const todoRouter = Router()

todoRouter.route("/todo").get(
    getUserId,
    todoread
)

todoRouter.route("/todo/add").post(
    getUserId,
    todocreate
)

todoRouter.route("/todo/update/:todo_id").put(
    getUserId,
    todoupdate
)

todoRouter.route("/todo/delete/:todo_id").delete(
    getUserId,
    tododelete
)

export {todoRouter}