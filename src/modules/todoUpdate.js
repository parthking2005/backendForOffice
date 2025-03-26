import { updateTodoModel, getTodoTitleModel } from "../database/dbServices.js";
import { ApiError } from "../helper/Error.js";

export const todoUpdate = async (user_id, todo_id, title, content) => {
    if (!user_id) {
        throw new ApiError(404, "user not found");
    }
    if (!todo_id) {
        throw new ApiError(400, "todo not found")
    }
    if ((!title  || title === "") && (!content || content === "")) {
        throw new ApiError(407, "enter title or content");
    }
    if (title === "") {
        title = null;
    }
    if (content === "") {
        content = null;
    }

    const todoTitleAlreadyExist = await getTodoTitleModel(title, user_id);

    if (todoTitleAlreadyExist) {
        throw new ApiError(420, "title already exist");
    }

    await updateTodoModel(user_id, todo_id, title, content)

    console.log("the row is updated");
}