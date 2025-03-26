import { ApiError } from "../../helper/Error.js";
import { ApiResponse } from "../../helper/response.js";
import { todoCreate, todoDelete, todoRead, todoUpdate } from "../../modules/index.js";


const todocreate = async (req, res) => {
    try {
        let user_id = await req.userid;
        let {title, content} = await req.body;
        await todoCreate(user_id, title, content);
        res.status(200).json(
            new ApiResponse(200, "todo created successfully")
        )
    } catch (e) {
        console.log(e);
        throw new ApiError(500, "todo creation has in error")
    }
}

const todoread = async (req, res) => {
    try {
        let user_id = req.userid;
        await todoRead(user_id);
        res.status(200).json(
            new ApiResponse(200, "todo readed successfully")
        )
    } catch (e) {
        console.log(e);
        throw new ApiError(500, "todo reading process has in error")
    }
}

const todoupdate = async (req, res) => {
    try {
        let user_id = await req.userid;
        let {todo_id} = await req.params;
        let {title, content} = req.body;
        await todoUpdate(user_id, todo_id, title, content);
        res.status(200).json(
            new ApiResponse(200, "todo updated successfully")
        )
    } catch (e) {
        console.log(e);
        throw new ApiError(500, "updating todo process has in error")
    }
}

const tododelete = async (req, res) => {
    try {
        let user_id = await req.userid;
        let {todo_id} = await req.params;
        await todoDelete(user_id, todo_id);
        res.status(200).json(
            new ApiResponse(200, "todo deleted successfully")
        )
    } catch (e) {
        console.log(e);
        throw new ApiError(500, "deleting process has in error")
    }
}

export {
    todocreate,
    todoread,
    todoupdate,
    tododelete
}