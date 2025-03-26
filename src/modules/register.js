import { ApiError } from "../helper/Error.js"
import { ApiResponse } from "../helper/response.js";
import { createUserModel, searchUserModel } from "../database/dbServices.js";
import { uploadOnCloudinary } from "../helper/cloudinary.js";
import { randomString } from "../helper/constants.js"
import fs from "fs";


export const registerModule = async ( req, {username, email, password } ) => {
    if (!username || username === "") {
        throw new ApiError(400, "username is not entered")
    }
    if (["@", "#", "!", "$", "%", "^", "&", "(", ")", "-", "[", "]", "{", "}", "?", "/", ",", "<", ">", "+", "`", "~"].some(field => username.includes(field))) {
        throw new ApiError(400, "username is not valid only numbers, alphabets and underscore(_) is valid")
    }
    
    if (!email || email === "") {
        throw new ApiError(400, "email is not entered")
    }
    if (["#", "!", "$", "%", "^", "&", "(", ")", "-", "[", "]", "{", "}", "?", "/", ",", "<", ">", "+", "`", "~"].some(field => email.includes(field))) {
        throw new ApiError(400, "email is not valid only numbers, alphabets, dot(.) and @")
    }

    const userFoundOrNot = await searchUserModel(username, email);

    if (userFoundOrNot) {
        throw new ApiError(422, "user already exist")
    }

    if (!password  || password === "") {
        throw new ApiError(400, "password is not entered")
    }

    if (password.length < 8) {
        throw new ApiError(409, "password should be length of minimum 8")
    }
    if (email.includes("@" && email.includes("."))) {
        throw new ApiError(409, "not valid email")
    }
    const profileimgLocalPath = req.file?.path
    let profileimg = await uploadOnCloudinary(profileimgLocalPath)
    

    if (profileimg) {
        console.log("profile image url is ========> ",profileimg);
        fs.unlinkSync(profileimgLocalPath)
    } else {
        profileimg = "";
        console.log("profile image is not set");
    }

    let id = randomString()
    
    createUserModel(id, username, email.toLowerCase(), profileimg, password)
    .then(() => {
        new ApiResponse(200, "user register succesfully")
    })
}   


