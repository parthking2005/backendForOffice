import { updateTodoModel, getTodoTitleModel } from "../database/dbServices.js";
import { ApiError } from "../helper/Error.js";

export const todoUpdate = async (user_id, todo_id, title, content) => {
    if (!user_id) {
        return {statusCode:401, message:"token expired"}
    }
    if (!todo_id) {
        return {statusCode:400, message:"todo not found"}
    }
    if ((!title  || title === "") && (!content || content === "")) {
        return {statusCode:407, message:"enter title or content"};
    }
    if (title === "") {
        title = null;
    }
    if (content === "") {
        content = null;
    }

    const todoTitleAlreadyExist = await getTodoTitleModel(title, user_id, todo_id);

    if (todoTitleAlreadyExist) {
        return {statusCode:420, message:"title already exist"}
    }

    try {
        await updateTodoModel(user_id, todo_id, title, content)
        return {statusCode:200, message:"todo updated successfully!"}
    } catch (error) {
        console.log(error)
        return {statusCode:501, message:"something error in updating todo"}
    }
}