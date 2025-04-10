import { ApiError } from "../helper/Error.js"
import { ApiResponse } from "../helper/response.js";
import { createUserModel, searchUserModel } from "../database/dbServices.js";
import { uploadOnCloudinary } from "../helper/cloudinary.js";
import { randomString } from "../helper/constants.js"
import bcrypt from "bcryptjs";
import fs from "fs";


export const registerModule = async ( {username, email, password}, path ) => {
    if (!username || username === "") {
        console.log("user enter this condition")
        return {statusCode:407, message: "user not entered username"}
    }
    if (["@", "#", "!", "$", "%", "^", "&", "(", ")", "-", "[", "]", "{", "}", "?", "/", ",", "<", ">", "+", "`", "~", " "].some(field => username.trim().includes(field))) {
        return {statusCode:400, message:"username is not valid only numbers, alphabets and underscore(_) is valid"}
    }
    
    if (!email || email === "") {
        return {statusCode:407, message:"email is not entered"}
    }
    if (["#", "!", "$", "%", "^", "&", "(", ")", "-", "[", "]", "{", "}", "?", "/", ",", "<", ">", "+", "`", "~", " "].some(field => email.trim().includes(field))) {
        return {statusCode:400, message:"email is not valid only numbers, alphabets, dot(.) and @"}
    }

    if (!email.includes("@") || !email.includes(".")){
        return {statusCode:409, message:"not valid email"}
    }
    const userFoundOrNot = await searchUserModel(username, email);

    if (userFoundOrNot) {
        console.log("entered in user already exist")
        return {statusCode:422, message:"user already exist"}
    }
    
    if (!password  || password.trim() === "") {
        return {statusCode:407, message:"password is not entered"}
    }

    if (password.length < 8) {
        return {statusCode:409, message:"password should be length of minimum 8"}
    } else {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
        if (!strongPasswordRegex.test(password)) {
          return {statusCode:403, message:"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"}
        } 
      }
      
    try {

            const profileimgLocalPath = path;
            let profileimg = await uploadOnCloudinary(profileimgLocalPath)
        
            if (profileimg) {
                fs.unlinkSync(profileimgLocalPath)
            } else {
                profileimg = "";
            }

    
        let id = randomString()


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const registerModule = await createUserModel(id, username, email.toLowerCase(), profileimg, hashedPassword)
        if (registerModule) {
            
            return {statusCode: 200, message: "user register succesfully"}
        }
    } catch (error) {
        console.log(error)
        return {statusCode:429, message:"something error in image upload"}
    }
}   
