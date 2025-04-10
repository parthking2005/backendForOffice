import { getUserTodosModel } from "../database/dbServices.js";
import { ApiError } from "../helper/Error.js";

export const todoRead = async (data) => {
    if (!data) {
        return {statusCode:401, message:"token expired", data: []};
    }

    try {
        const todos = await getUserTodosModel(data);
        return {statusCode:200, message:"todos found", data:todos}
    } catch (error) {
        console.log(error)
        return {statusCode:501, message:"error in finding todos", data: []};
    } 
}