import { ApiError } from "../../helper/Error.js";
import { ApiResponse } from "../../helper/response.js";
import { todoCreate, todoDelete, todoRead, todoUpdate } from "../../modules/index.js";


const todocreate = async (req, res) => {
    try {
        let user_id = await req?.userid;
        let {title, content} = await req.body;
        const todoCreateApi = await todoCreate(user_id, title, content);
        res.json(
            new ApiResponse(todoCreateApi.statusCode, todoCreateApi.message)
        )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "todo creation has in error")
    }
}

const todoread = async (req, res) => {
    try {
        let user_id = req.userid;
        const todoReadApi = await todoRead(user_id);
        res.json(
            new ApiResponse(todoReadApi.statusCode, todoReadApi.message, todoReadApi.data)
        )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "todo reading process has in error")
    }
}

const todoupdate = async (req, res) => {
    console.log("jay hind")
    try {
        let user_id = await req.userid;
        let {todo_id} = await req.params;
        let {title, content} = req.body;
        const todoUpdateApi = await todoUpdate(user_id, todo_id, title, content);
        res.status(200).json(
            new ApiResponse(todoUpdateApi.statusCode, todoUpdateApi.message)
        )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "updating todo process has in error")
    }
}

const tododelete = async (req, res) => {
    
    try {
        let user_id = await req.userid;
        let {todo_id} = await req.params;   
        const todoDeleteApi = await todoDelete(user_id, todo_id);
        res.status(200).json(
            new ApiResponse(todoDeleteApi.statusCode, todoDeleteApi.message)
        )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "deleting process has in error")
    }
}

export {
    todocreate,
    todoread,
    todoupdate,
    tododelete
}