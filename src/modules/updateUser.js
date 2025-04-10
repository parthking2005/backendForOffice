import { searchUserModel, updateUserModel } from "../database/dbServices.js";
import { uploadOnCloudinary } from "../helper/cloudinary.js";
import fs from "fs";

export const updateUserModule = async ({ username=null, email=null }, path, user_id) => {
    console.log(username, "username in module")
    console.log(email, "email in module")
    console.log(path, "path in module")
    console.log(user_id, "user_id in module")
    try {

        if (!user_id) {
            return {statusCode:401, message:"token expired"}
        }

        if (email) {
            email = email.toLowerCase()
            if (!email.includes("@") || !email.includes(".")) {
                console.log("congress bro congress inner")
                return { statusCode: 404, message: "not valid email" }
            }
            if (["#", "!", "$", "%", "^", "&", "(", ")", "-", "[", "]", "{", "}", "?", "/", ",", "<", ">", "+", "`", "~"].some(field => email.includes(field))) {

                return { statusCode: 404, message: "email is not valid only numbers, alphabets, dot(.) and @" }
            }
            if (email.trim() === "") {
                console.log("user enter this condition")
                return { statusCode: 400, message: "user not entered email" }
            }
        }
        if (username) {
            if (["@", "#", "!", "$", "%", "^", "&", "(", ")", "-", "[", "]", "{", "}", "?", "/", ",", "<", ">", "+", "`", "~"].some(field => username.includes(field))) {
                return { statusCode: 404, message: "username is not valid only numbers, alphabets and underscore(_) is valid" }
            }
            if (username.trim() === "") {
                console.log("user enter this condition")
                return { statusCode: 400, message: "user not entered username" }
            }
        }








        const userFoundOrNot = await searchUserModel(username, email);

        if (userFoundOrNot) {
            console.log("entered in user already exist")
            return { statusCode: 422, message: "user or email is already exist" }
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 429, message: "something error in validating user" }
    }




    //    try {
    
    const profileimgLocalPath = path;
    let profileimg = await uploadOnCloudinary(profileimgLocalPath)
    //  console.log(typeof profileimg, "profileimg ")

    if (profileimg) {
        fs.unlinkSync(profileimgLocalPath)
    } else {
        profileimg = "";
    }
    //    } catch (error) {
    //     console.log(error)
    //     return {statusCode:429, message:"something error in uploading image"}
    //    }


    console.log(username,email, profileimg, user_id, "=========================================================================================")

    try {
        const updateUserModule = await updateUserModel(username, email, profileimg, user_id)
        console.log(updateUserModule)
        if (updateUserModel) {
            return { statusCode: 200, message: "user updated succesfully", data: updateUserModule }
        } else {
            
            return { statusCode: 429, message: "something error in update user" }
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 429, message: "something error in update user" }
    }
}