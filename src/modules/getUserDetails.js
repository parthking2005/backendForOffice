import { getUserDetailesModel } from "../database/dbServices.js";

export const userRead = async (user_id) => {
    if (!user_id) {
        return {statusCode:404, message:"token expired", data: []};
    }

    try {
        const user = await getUserDetailesModel(user_id);
        console.log(user)
        if (user) {
            return {statusCode:200, message:"user found", data:user}
        } else {
            return {statusCode:404, message:"user found", data:user}
        }
    } catch (error) {
        console.log(error)
        return {statusCode:501, message:"error in finding todos", data: []};
    } 
}