import { ApiError } from "../../helper/Error.js";
import { ApiResponse } from "../../helper/response.js";
import { registerModule } from "../../modules/register.js";
import { loginModule } from "../../modules/login.js";
         
const register = async (req, res) => {
    try {
        let data = await req.body;
        await registerModule(req, data);
        res.status(200).json(
            new ApiResponse(200, "User registered Successfully")
        )
    } catch (e) {
        console.log(e);
        throw new ApiError(500, "registraion process has in error")
    }
}

const login = async (req, res) => {
    try {
        let data = await req.body;
        await loginModule(data);
        res.status(200)
        .json(
            new ApiResponse(201, "User successfully logged in"
            )
        )
    } catch (e) {
        console.log(e);
        throw new ApiError(500, "login process has in error")
    }
}   


export {
    login,
    register
}