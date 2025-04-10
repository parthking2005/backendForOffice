import { ApiError } from "../../helper/Error.js";
import { ApiResponse } from "../../helper/response.js";
import { registerModule } from "../../modules/register.js";
import { loginModule } from "../../modules/login.js";
import { updateUserModule } from "../../modules/updateUser.js";
import { todoRead } from "../../modules/todoRead.js";
import { userDeleteModule } from "../../modules/deleteUser.js";
import { userRead } from "../../modules/getUserDetails.js";
// import { array } from "joi";

const register = async (req, res) => {
    try {
        let data = await req.body;
        let imgdata = await req?.file?.path;
        const registerApi = await registerModule(data, imgdata);
        res.json(
            new ApiResponse(registerApi.statusCode, registerApi.message)
        )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "registraion process has in error")
    }
}

const login = async (req, res) => {
    try {
        let data = await req.body;
        console.log(req.body)
        const loginApi = await loginModule(data);
        console.log(loginApi)
        res.json(
            new ApiResponse(loginApi.statusCode, loginApi.message, loginApi.data)
        )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "login process has in error")
    }
}



const updateUser = async (req, res) => {
    try {
        console.log(req.file)
        console.log(req.userid)
        console.log(req.body)
        let user_id = await req.userid;
        let imgdata = await req?.file?.path;
        let data = await req.body;
        const updateApi = await updateUserModule(data, imgdata, user_id);
        console.log(updateApi)
        res.json(
                new ApiResponse(updateApi.statusCode, updateApi.message, updateApi.data)
            )
            // res.json(
            //     new ApiResponse(200, "update user successfully!")
            // )
    } catch (e) {
        console.log(e);
        new ApiResponse(500, "update user has some error")
    }
}

const deleteUser = async (req, res) => {
    try {

        console.log(req.userid)
        // console.log(req.body)
        let user_id = await req.userid;
        const todoReadApi = await todoRead(user_id);

        if (todoReadApi.data.length === 0) {
            const deleteUser = await userDeleteModule(user_id);
            console.log(deleteUser)
            res.json(
                    new ApiResponse(deleteUser.statusCode, deleteUser.message, deleteUser.data)
                )
        }else{
            res.json(
                new ApiResponse(405, "first delete your all todos")
            )
        }

    } catch (e) {
        console.log(e);
        new ApiResponse(500, "update user has some error")
    }
}
 

const getUserDetails = async (req, res) => {
    try {

        console.log(req.userid)
        // console.log(req.body)
        let user_id = await req.userid;
        const userReadDetails = await userRead(user_id);

        console.log(userReadDetails.data)
        if (userReadDetails.data) {
            res.json(
                    new ApiResponse(userReadDetails.statusCode, userReadDetails.message, userReadDetails.data)
                )
        }else{
            res.json(
                new ApiResponse(404, "token expired")
            )
        }

    } catch (e) {
        console.log(e);
        new ApiResponse(500, "update user has some error")
    }
}

export {
    login,
    register,
    updateUser,
    deleteUser,
    getUserDetails
}