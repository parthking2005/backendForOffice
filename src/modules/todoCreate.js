import { createTodoModel, getTodoTitleModel } from "../database/dbServices.js";
import { randomString } from "../helper/constants.js";
import { ApiError } from "../helper/Error.js";

export const todoCreate = async (user_id, title, content, completed = false) => {
    console.log(user_id);
    if (!user_id) {
        return {statusCode:401, message:"token expired"}
    }
    if (!title || title === "") {
        return {statusCode:400, message:"title is not entered"}
    }
    if (!content || content === "") {
        return {statusCode:400, message:"content is not entered"}
    }


    const todoTitleAlreadyExist = await getTodoTitleModel(title, user_id);

    if (todoTitleAlreadyExist) {
        return {statusCode:420, message:"title already exist"}
    }

    try {
        let todo_id = randomString();
        let created_at = Date.now();
        await createTodoModel(user_id, todo_id, title, content, completed, created_at).catch(console.error);
        return {statusCode:200, message:"todo created Succesfully"}
    } catch (error) {
        console.log(error)
        return {statusCode:501, message:"something error while creating todo"}
    }
}