import { deleteTodoModel } from "../database/dbServices.js";
import { ApiError } from "../helper/Error.js";

export const todoDelete = async (user_id, todo_id) => {
    if (!user_id || user_id==="undefined") {
        return {statusCode:401, message:"token expired"}
    }
    
    if (!todo_id || todo_id==="undefined") {
        return {statusCode:400, message:"todo not found"}
    }
    
    try {
        await deleteTodoModel(user_id, todo_id)
    
        console.log("Todo delte thay gayu yeah!!!!");
        return {statusCode:200, message:"deleted"}
    } catch (error) {
        console.log(error)
        return {statusCode:501, message:"something error in delete"}
    }
}