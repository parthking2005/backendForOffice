import { createTodoModel, getTodoTitleModel } from "../database/dbServices.js";
import { randomString } from "../helper/constants.js";
import { ApiError } from "../helper/Error.js";

export const todoCreate = async (user_id, title, content, completed = false) => {
    console.log(user_id);
    if (!user_id) {
        throw new ApiError(404, "user not found");
    }
    if (!title || title === "") {
        throw new ApiError(400, "title is not entered")
    }
    if (!content || content === "") {
        throw new ApiError(400, "content is not entered")
    }


    const todoTitleAlreadyExist = await getTodoTitleModel(title, user_id);

    if (todoTitleAlreadyExist) {
        throw new ApiError(420, "title already exist");
    }

    let todo_id = randomString();
    let created_at = Date.now();
    await createTodoModel(user_id, todo_id, title, content, completed, created_at).catch(console.error);
}