import { getUserTodosModel } from "../database/dbServices.js";
import { ApiError } from "../helper/Error.js";

export const todoRead = async (data) => {
    console.log(data);
    if (!data) {
        throw new ApiError(404, "user not found");
    }

    const todos = await getUserTodosModel(data);

    return todos;
}