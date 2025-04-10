import { getUserIdModel, matchUserModel } from "../database/dbServices.js";
import { jwtTokenGenerate } from "../helper/jwtAuth.js";
import bcrypt from "bcryptjs";


export const loginModule = async ({ entereduser, password }) => {
    console.log(entereduser, password)
    if (!entereduser || entereduser === "") {
        return { statusCode: 400, message: "username or email is not entered" }
    }

    if (!password || password === "") {
        return { statusCode: 400, message: "password is not entered" }
    }

    const isUserFound = await matchUserModel(entereduser)

    console.log(isUserFound, "data shu chhe beta")
    console.log(isUserFound.password, "data shu chhe beta")
    if (!isUserFound) {
        return { statusCode: 404, message: "token expired" }
    } else {
        const compare = await bcrypt.compare(password, isUserFound.password);
        if (compare) {
            try {
                const userId = await getUserIdModel(entereduser).catch(console.error);
                if (!userId) {
                    return { statusCode: 404, message: "User Id not found" }
                }
                const generatedJwt = await jwtTokenGenerate(userId);
                console.log(generatedJwt)
    
                return {statusCode:200, message:"you are successfully logged in", data: {generatedJwt, isUserFound}}
            } catch (error) {
                console.log(error)
                return { statusCode: 501, message: "something error while finding id" }
            }
        } else {
            return { statusCode: 402, message: "Invalid Credentails" }
        }
    }


}