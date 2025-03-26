import { deleteTodoModel } from "../database/dbServices.js";
import { ApiError } from "../helper/Error.js";

export const todoDelete = async (user_id, todo_id) => {
    if (!user_id) {
        throw new ApiError(404, "user not found");
    }
    if (!todo_id) {
        throw new ApiError(400, "todo not found")
    }
    
    await deleteTodoModel(user_id, todo_id)

    console.log("Todo delte thay gayu yeah!!!!");

}