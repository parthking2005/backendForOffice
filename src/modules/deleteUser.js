import { deleteUserModel } from "../database/dbServices.js";

export const userDeleteModule = async (user_id) => {
    if (!user_id || user_id==="undefined") {
        return {statusCode:404, message:"token expired"}
    }
    
    
    try {
        await deleteUserModel(user_id)
        console.log("User delte thay gayu yeah!!!!");
        return {statusCode:200, message:"deleted"}
    } catch (error) {
        console.log(error)
        return {statusCode:501, message:"something error in delete"}
    }
}