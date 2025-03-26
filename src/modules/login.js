import { ApiError } from "../helper/Error.js"
import { ApiResponse } from "../helper/response.js";
import { getUserIdModel, matchUserModel } from "../database/dbServices.js";
import { jwtTokenGenerate } from "../helper/jwtAuth.js";


export const loginModule = async ({ entereduser, password } ) => {
    if (!entereduser || entereduser === "") {
        throw new ApiError(400, "username or email is not entered")
    }

    if (!password  || password === "") {
        throw new ApiError(400, "password is not entered")
    }

    const isUserFound = await matchUserModel(entereduser)

    if (!isUserFound){
        throw new ApiError(404, "User not found")
    }else{
        if (isUserFound === password) {
            new ApiResponse(200, "you are successfully logged in")
        } else {
            throw new ApiError(401, "wrong password")
        }
    }

    const userId = await getUserIdModel(entereduser).catch(console.error);
    console.log(userId);

    const generatedJwt = await jwtTokenGenerate(userId);

    return generatedJwt;
}